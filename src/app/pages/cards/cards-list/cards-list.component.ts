import { CreditCardService } from './../shared/credit-card.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Component } from '@angular/core';
import { CreditCard } from '../shared/credit-card.model';

@Component({
    selector: 'app-cards-list',
    templateUrl: './cards-list.component.html',
    styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent extends BaseResourceListComponent<CreditCard> {

    constructor(creditCardService: CreditCardService) { 
        super(creditCardService);
    }
}
