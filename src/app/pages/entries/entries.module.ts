import { SharedModule } from './../../shared/shared.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryFormComponent } from './entry-form/entry-form.component';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        EntryListComponent,
        EntryFormComponent
    ],
    imports: [
        SharedModule,
        EntriesRoutingModule,
        CalendarModule,
        IMaskModule,
        FormsModule
    ]
})
export class EntriesModule { }
