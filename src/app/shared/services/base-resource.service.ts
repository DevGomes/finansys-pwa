import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Injector } from '@angular/core';


export abstract class BaseResouceService<T extends BaseResourceModel> {

    protected http: HttpClient;

    constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData) => T) { 
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<T[]> {
        return this.http.get(this.apiPath).pipe(
            map(this.jsonDataToModels.bind(this)),
            catchError(this.handlerError)
        );
    }

    getById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;

        return this.http.get(url).pipe(
            map(this.jsonDataToModel.bind(this)),
            catchError(this.handlerError)
        );
    }

    create(model: T): Observable<T> {
        return this.http.post(this.apiPath, model).pipe(
            map(this.jsonDataToModel.bind(this)),
            catchError(this.handlerError)
        );
    }

    update(model: T): Observable<T> {
        const url = `${this.apiPath}/${model.id}`;

        return this.http.put(this.apiPath, model).pipe(
            map(() => model),
            catchError(this.handlerError)
        );
    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;

        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.handlerError)
        );
    }


     // PROTECTED METHODS

     protected jsonDataToModels(jsonData: any[]): T [] {
        const models: T [] = [];
        jsonData.forEach(
            element =>  models.push( this.jsonDataToResourceFn(element) )
        );
        return models;
    }

    protected handlerError(error: any): Observable<any> {
        console.log('ERRO NA REQUISIÇÃO => ', error);
        return throwError(error);
    }

    protected jsonDataToModel(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }
}