import { CategoryService } from './../../categories/shared/category.service';
import { Category } from './../../categories/shared/category.model';
import { EntryService } from './../shared/entry.service';
import { Entry } from './../shared/entry.model';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

@Component({
    selector: 'app-entry-form',
    templateUrl: './entry-form.component.html',
    styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

    currentAction: string;
    entryForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;
    entry: Entry = new Entry();
    categories: Array<Category>;

    imaskConfig = {
        mask: Number,
        scale: 2,
        thousandsSeparator: '.',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: ','
    };

    ptBR = {
        firstDayOfWeek: 0,
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
        monthNames: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
            'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        today: 'Hoje',
        clear: 'Limpar'
    };

    constructor(
        private entryService: EntryService,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
    ) { }


    ngOnInit(): void {
        this.setCurrentAction();
        this.buildEntryForm();
        this.loadEntry();
        this.loadCategories();
    }

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    submitForm(): void {
        this.submittingForm = true;

        if (this.currentAction === 'new') {
            this.createEntry();
        } else {
            this.updateEntry();
        }
    }

    get typeOptions(): Array<any> {
        return Object.entries(Entry.types).map(
            ([value, text]) => {
                return {
                    text,
                    value
                };
            }
        );
    }

    // PRIVATE METHODS
    private setCurrentAction(): void {
        if (this.activateRoute.snapshot.url[0].path === 'new') {
            this.currentAction = 'new';
        } else {
            this.currentAction = 'edit';
        }
    }

    private buildEntryForm(): void {
        this.entryForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required, Validators.minLength(2)]],
            description: [null],
            type: ['expense', [Validators.required]],
            amount: [null, [Validators.required]],
            date: [null, [Validators.required]],
            paid: [true, [Validators.required]],
            categoryId: [null, [Validators.required]],
        });
    }

    private loadEntry(): void {
        if (this.currentAction === 'edit') {
            this.activateRoute.paramMap.pipe(
                switchMap(params => this.entryService.getById(+params.get('id'))) // O '+' faz um cast para o tipo number
            )
            .subscribe(
                (entry) => {
                    this.entry = entry;
                    this.entryForm.patchValue(entry); // Carrega a categoria, obtida do banco para o formulário
                },
                (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
            );

        }
    }

    private loadCategories(): void {
        this.categoryService.getAll().subscribe(
            categories => this.categories = categories
        );
    }

    private setPageTitle(): void {
        if (this.currentAction === 'new') {
            this.pageTitle = 'Cadastro de Novo Lançamento';
        } else {
            const entryName = this.entry.name || '';
            this.pageTitle = `Editando Lançamento: ${entryName}`;
        }
    }

    private createEntry(): void {
        const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

        this.entryService.create(entry).subscribe(
            entrySave => this.actionsForSuccess(entrySave),
            error => this.actionsForError(error)
        );
    }

    private updateEntry(): void {
        const entry: Entry = Object.assign(new Entry(), this.entryForm.value);

        this.entryService.update(entry).subscribe(
            entrySave => this.actionsForSuccess(entrySave),
            error => this.actionsForError(error)
        );
    }

    private async actionsForSuccess(entry: Entry) {
        toastr.success('Solicitação processada com sucesso!');

        // redirect/reload component page, forçar para esse componente ser completamente recarregado
        // skipLocationChange, para não adicionar a rota no historico de navegação do browser
        await this.router.navigateByUrl('entries', { skipLocationChange: true });
        this.router.navigate(['entries', entry.id, 'edit']);
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
