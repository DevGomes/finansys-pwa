import { CategoryService } from './../shared/category.service';
import { Category } from './../shared/category.model';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

    currentAction: string;
    categoryForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;
    category: Category = new Category();

    constructor(
        private categoryService: CategoryService,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }


    ngOnInit(): void {
        this.setCurrentAction();
        this.buildCategoryForm();
        this.loadCategory();
    }

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    submitForm(): void {
        this.submittingForm = true;

        if (this.currentAction === 'new') {
            this.createCategory();
        } else {
            this.updateCategory();
        }
    }

    // PRIVATE METHODS
    private setCurrentAction(): void {
        if (this.activateRoute.snapshot.url[0].path === 'new') {
            this.currentAction = 'new';
        } else {
            this.currentAction = 'edit';
        }
    }

    private buildCategoryForm(): void {
        this.categoryForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required, Validators.minLength(2)]],
            description: [null]
        });
    }

    private loadCategory(): void {
        if (this.currentAction === 'edit') {
            this.activateRoute.paramMap.pipe(
                switchMap(params => this.categoryService.getById(+params.get('id'))) // O '+' faz um cast para o tipo number
            )
            .subscribe(
                (category) => {
                    this.category = category;
                    this.categoryForm.patchValue(category); // Carrega a categoria, obtida do banco para o formulário
                },
                (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
            );

        }
    }

    private setPageTitle(): void {
        if (this.currentAction === 'new') {
            this.pageTitle = 'Cadastro de Nova Categoria';
        } else {
            const categoryName = this.category.name || '';
            this.pageTitle = `Editando Categoria: ${categoryName}`;
        }
    }

    private createCategory(): void {
        const category: Category = Object.assign(new Category(), this.categoryForm.value);

        this.categoryService.create(category).subscribe(
            categorySave => this.actionsForSuccess(categorySave),
            error => this.actionsForError(error)
        );
    }

    private updateCategory(): void {
        const category: Category = Object.assign(new Category(), this.categoryForm.value);

        this.categoryService.update(category).subscribe(
            categorySave => this.actionsForSuccess(categorySave),
            error => this.actionsForError(error)
        );
    }

    private async actionsForSuccess(category: Category) {
        toastr.success('Solicitação processada com sucesso!');

        // redirect/reload component page, forçar para esse componente ser completamente recarregado
        // skipLocationChange, para não adicionar a rota no historico de navegação do browser
        await this.router.navigateByUrl('categories', { skipLocationChange: true });
        this.router.navigate(['categories', category.id, 'edit']);
    }

    private actionsForError(error: any): void {
        toastr.error('Ocorreu um erro ao processar a sua solicitação');
        this.submittingForm = false;

        if (error.status === 422) {
            this.serverErrorMessages = JSON.parse(error._body).console.errors;
        } else {
            this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor tente mais tarde.'];
        }
    }
}
