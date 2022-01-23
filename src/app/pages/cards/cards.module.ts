import { CardsRoutingModule } from './cards-routing.module';
import { CardsFormComponent } from './cards-form/cards-form.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CardsListComponent } from './cards-list/cards-list.component';



@NgModule({
  declarations: [
    CardsFormComponent,
    CardsListComponent
  ],
  imports: [
    CardsRoutingModule,
    SharedModule
  ]
})
export class CardsModule { }
