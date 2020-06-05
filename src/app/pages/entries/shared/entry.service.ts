import { CategoryService } from './../../categories/shared/category.service';
import { catchError, map, flatMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Entry } from './entry.model';

@Injectable({
    providedIn: 'root'
})
export class EntryService {

    private apiPath: string = 'api/entries';

    constructor(
        private http: HttpClient,
        private categoryService: CategoryService
    ) { }


    getAll(): Observable<Entry[]> {
        return this.http.get(this.apiPath).pipe(
            catchError(this.handlerError),
            map(this.jsonDataToEntries)
        );
    }

    getById(id: number): Observable<Entry> {
        const url = `${this.apiPath}/${id}`;

        return this.http.get(url).pipe(
            catchError(this.handlerError),
            map(this.jsonDataToEntry)
        );
    }

    create(entry: Entry): Observable<Entry> {

        return this.categoryService.getById(entry.categoryId).pipe(
            // Transformar os dois  Observable<Entry> retornados em um único Observable
            flatMap(categoryResult => {
                entry.category = categoryResult;

                return this.http.post(this.apiPath, entry).pipe(
                    catchError(this.handlerError),
                    map(this.jsonDataToEntry)
                );
            })
        );

    }

    update(entry: Entry): Observable<Entry> {
        const url = `${this.apiPath}/${entry.id}`;

        return this.categoryService.getById(entry.categoryId).pipe(
            // Transformar os dois  Observable<Entry> retornados em um único Observable
            flatMap(categoryResult => {
                entry.category = categoryResult;

                return this.http.put(url, entry).pipe(
                    catchError(this.handlerError),
                    map(() => entry)
                );
            })
        );

    }

    delete(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;

        return this.http.delete(url).pipe(
            catchError(this.handlerError),
            map(() => null)
        );
    }


    // PRIVATE METHODS

    private jsonDataToEntries(jsonData: any[]): Entry [] {
        const entries: Entry [] = [];
        jsonData.forEach(jsonEntry =>  entries.push(Object.assign(new Entry(), jsonEntry)));
        return entries;
    }

    private handlerError(error: any): Observable<any> {
        console.log('ERRO NA REQUISIÇÃO => ', error);
        return throwError(error);
    }

    private jsonDataToEntry(jsonData: any): Entry {
        return Object.assign(new Entry(), jsonData);
    }
}
