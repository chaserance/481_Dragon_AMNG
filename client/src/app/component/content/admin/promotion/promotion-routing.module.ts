import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PromotionComponent} from './promotion.component';


const routes: Routes = [
  {
    path: '',
    component: PromotionComponent,
    // children: [
    //   { path: '', redirectTo: 'list' },
    //   { path: 'list', component: ListComponent },
    //   { path: 'detail/:id', component: DetailComponent},
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionRoutingModule {}
