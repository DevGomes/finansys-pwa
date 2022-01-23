import { BaseResouceService } from 'src/app/shared/services/base-resource.service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';


export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string;
    resourceForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;

    protected activateRoute: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

    constructor(
        protected injector: Injector,
        public resource: T,
        protected resourceService: BaseResouceService<T>,
        protected jsonDataToResourceFn: (jsonDate) => T
    ) { 
        this.router = this.injector.get(Router);
        this.activateRoute = this.injector.get(ActivatedRoute);
        this.formBuilder = this.injector.get(FormBuilder);
    }


    ngOnInit(): void {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();
    }

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    submitForm(): void {
        this.submittingForm = true;

        if (this.currentAction === 'new') {
            this.createResource();
        } else {
            this.updateResource();
        }
    }

    // PROTECTED METHODS

    protected setCurrentAction(): void {
        if (this.activateRoute.snapshot.url[0].path === 'new') {
            this.currentAction = 'new';
        } else {
            this.currentAction = 'edit';
        }
    }

    protected loadResource(): void {
        if (this.currentAction === 'edit') {
            this.activateRoute.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get('id'))) // O '+' faz um cast para o tipo number
            )
                .subscribe(
                    (resource) => {
                        this.resource = resource;
                        this.resourceForm.patchValue(resource); // Carrega o objeto modelo, obtida do banco para o formulário
                    },
                    (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
                );

        }
    }

    protected setPageTitle(): void {
        if (this.currentAction === 'new') {
            this.pageTitle = this.creationPageTitle();
        } else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected createResource(): void {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.create(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
        );
    }

    protected updateResource(): void {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

        this.resourceService.update(resource).subscribe(
            resource => this.actionsForSuccess(resource),
            error => this.actionsForError(error)
        );
    }

    protected async actionsForSuccess(resource: T) {
        toastr.success('Solicitação processada com sucesso!');
        const baseComponentPath: string = this.activateRoute.snapshot.parent.url[0].path;

        // redirect/reload component page, forçar para esse componente ser completamente recarregado
        // skipLocationChange, para não adicionar a rota no historico de navegação do browser
        await this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true });
        this.router.navigate([baseComponentPath, resource.id, 'edit']);
    }

    protected actionsForError(error: any): void {
        toastr.error('Ocorreu um erro ao processar a sua solicitação');
        this.submittingForm = false;

        if (error.status === 422) {
            this.serverErrorMessages = JSON.parse(error._body).console.errors;
        } else {
            this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor tente mais tarde.'];
        }
    }

    protected abstract creationPageTitle(): string;

    protected abstract editionPageTitle(): string;

    protected abstract buildResourceForm(): void;

}
