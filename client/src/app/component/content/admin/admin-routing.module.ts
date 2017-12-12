import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
      { path: 'programs', loadChildren: './program/program.module#ProgramModule' },
      // { path: 'forms', loadChildren: './form/form.module#FormModule' },
      // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
      // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
      // { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
      // { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
