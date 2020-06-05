import { EntriesModule } from './pages/entries/entries.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesModule } from './pages/categories/categories.module';

// Importação para configuração do inteceptador HttpClient, para simular chamada de API configurada no arquivo './in-memory-database'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from './in-memory-database';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CategoriesModule,
        EntriesModule,
        BrowserAnimationsModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
