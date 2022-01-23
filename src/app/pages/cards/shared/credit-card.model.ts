import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class CreditCard extends BaseResourceModel {
    constructor(
        public cardFlag?: string,
        public bankName?: string
    ) {
        super();
    }

    static fromJson(jsonData: any): CreditCard {
        return Object.assign(new CreditCard(), jsonData);
    }
}