import { CardsFormComponent } from './cards-form/cards-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsListComponent } from './cards-list/cards-list.component';


const routes: Routes = [
  { path: '', component: CardsListComponent },
  { path: 'new', component: CardsFormComponent },
  { path: ':id/edit', component: CardsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
