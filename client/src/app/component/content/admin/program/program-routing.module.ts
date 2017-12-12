import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProgramComponent} from './program.component';
import {EditableTableComponent} from './editable-table/editable-table.component';


const routes: Routes = [
  {
    path: '',
    component: ProgramComponent,
    children: [
       { path: '', redirectTo: 'editable-table' },
       { path: 'editable-table', component: EditableTableComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule {}

export const routedComponents = [
  ProgramComponent,
  EditableTableComponent
];
