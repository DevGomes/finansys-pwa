import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';
import { ChartModule, EditorModule } from 'primeng';


@NgModule({
  declarations: [ReportsComponent],
  imports: [
    SharedModule,
    ReportsRoutingModule,
    EditorModule,
    EditorModule,
    ChartModule,
  ]
})
export class ReportsModule { }
