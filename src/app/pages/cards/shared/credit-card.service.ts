import { BaseResouceService } from 'src/app/shared/services/base-resource.service';
import { Injectable, Injector } from '@angular/core';
import { CreditCard } from './credit-card.model';

@Injectable({
    providedIn: 'root'
})
export class CreditCardService extends BaseResouceService<CreditCard> {

    constructor(protected injector: Injector) { 
        super('api/creditCards', injector, CreditCard.fromJson);
    }
}
