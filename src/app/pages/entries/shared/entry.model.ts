import { TypeOfPayments } from './type-of-payments.enum';
import { Category } from './../../categories/shared/category.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { CreditCard } from '../../cards/shared/credit-card.model';

export class Entry extends BaseResourceModel {
    constructor(
        public name?: string,
        public description?: string,
        public type?: string,
        public amount?: string,
        public date?: string,
        public paid?: boolean,
        public categoryId?: number,
        public category?: Category,
        public typeOfPayment?: TypeOfPayments,
        public creditCard?: CreditCard
    ) {
        super();
    }


    static types = {
        expense: 'Despesa',
        revenue: 'Receita'
    };

    static fromJson(jsonData: any): Entry {
        return Object.assign(new Entry(), jsonData);
    }

    get paidText(): string {
        return this.paid ? 'Pago' : 'Pendente';
    }
}
