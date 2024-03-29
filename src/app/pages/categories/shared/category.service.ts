import { Category } from './category.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResouceService } from 'src/app/shared/services/base-resource.service';


@Injectable({
    providedIn: 'root'
})
export class CategoryService extends BaseResouceService<Category> {

    constructor(protected injector: Injector) { 
        super('api/categories', injector, Category.fromJson);
    }
}
