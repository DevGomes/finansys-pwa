import { CreditCardService } from './../../cards/shared/credit-card.service';
import { TypeOfPayments } from '../shared/type-of-payments.enum';
import { CategoryService } from './../../categories/shared/category.service';
import { Category } from './../../categories/shared/category.model';
import { EntryService } from './../shared/entry.service';
import { Entry } from './../shared/entry.model';
import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { CreditCard } from '../../cards/shared/credit-card.model';
import { ptBRInputConfigCalender } from 'src/app/shared/models/input-config';

@Component({
    selector: 'app-entry-form',
    templateUrl: './entry-form.component.html',
    styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {

    categories: Array<Category>;
    creditCards: Array<CreditCard>;
    typeOptions: Array<any>;
    CREDIT_CARD = TypeOfPayments.CARTAO_CREDITO;

    imaskConfig = {
        mask: Number,
        scale: 2,
        thousandsSeparator: '',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: ','
    };

    ptBR: any;

    typeOfPaymentsList = Object.keys(TypeOfPayments).map(key => TypeOfPayments[key]);

    constructor(
        protected entryService: EntryService,
        protected categoryService: CategoryService,
        protected creditCardService: CreditCardService,
        protected injector: Injector
    ) { 
        super(injector, new Entry(), entryService, Entry.fromJson);
        this.ptBR = ptBRInputConfigCalender;
    }


    ngOnInit(): void {
        super.ngOnInit();
        this.loadCategories();
        this.loadCreditCards();
        this.loadTypeEntries();
    }

    loadTypeEntries() {
        this.typeOptions = Object.entries(Entry.types).map(
            ([value, text]) => {
                return {
                    text,
                    value
                }
            }
        );
    }

    changeTypeOfPayment(typePayment: string): void {
        this.resourceForm.get('typeOfPayment').setValue(typePayment);
        this.resourceForm.get('creditCard').setValue(null);
    }

    protected buildResourceForm(): void {
        this.resourceForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required, Validators.minLength(2)]],
            description: [null],
            type: ['expense', [Validators.required]],
            amount: [null, [Validators.required]],
            date: [null, [Validators.required]],
            paid: [true, [Validators.required]],
            categoryId: [null, [Validators.required]],
            typeOfPayment: [null],
            creditCard: [null]
        });
    }

    private loadCategories(): void {
        this.categoryService.getAll().subscribe(
            categories => this.categories = categories
        );
    }

    private loadCreditCards(): void {
        this.creditCardService.getAll().subscribe(
            creditCards =>  this.creditCards = creditCards
        );
    }

    protected creationPageTitle(): string {
       return 'Cadastro de Novo Lançamento';
    }

    protected editionPageTitle(): string {
        const entryName: string = this.resource.name || '';
        return `Editando Lançamento: ${entryName}`;
    }

    onChangeEntryType(): void {
        this.resourceForm.get('creditCard').setValue(null);
        this.resourceForm.get('typeOfPayment').setValue(null);        
    }

}
