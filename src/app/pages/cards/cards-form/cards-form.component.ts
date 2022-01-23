import { Validators } from '@angular/forms';
import { CreditCardService } from './../shared/credit-card.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Component, Injector } from '@angular/core';
import { CreditCard } from '../shared/credit-card.model';

@Component({
    selector: 'app-cards-form',
    templateUrl: './cards-form.component.html',
    styleUrls: ['./cards-form.component.scss']
})
export class CardsFormComponent extends BaseResourceFormComponent<CreditCard> {

    constructor(injector: Injector, creditCardService: CreditCardService) { 
        super(injector, new CreditCard(), creditCardService, CreditCard.fromJson);
    }

    protected creationPageTitle(): string {
        return 'Cadastro Cartão de Crédito';
    }
    protected editionPageTitle(): string {
        const bankName: string = this.resource.bankName || '';
        return `Editando Cartão: ${bankName}`;
    }
    protected buildResourceForm(): void {
        this.resourceForm = this.formBuilder.group({
            id: [null],
            bankName: [null, [Validators.required, Validators.minLength(2)]],
            cardFlag: [null,[Validators.required, Validators.minLength(2)]]
        });
    }

}
