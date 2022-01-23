import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Importação para configuração do inteceptador HttpClient, para simular chamada de API configurada no arquivo './in-memory-database'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
    declarations: [NavbarComponent],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
        RouterModule
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NavbarComponent
    ]
})
export class CoreModule { }
