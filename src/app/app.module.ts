import { ReportsModule } from './pages/reports/reports.module';
import { CoreModule } from './core/core.module';
import { EntriesModule } from './pages/entries/entries.module';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesModule } from './pages/categories/categories.module';
import { CardsModule } from './pages/cards/cards.module';



@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        CoreModule,
        CategoriesModule,
        EntriesModule,
        ReportsModule,
        CardsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
