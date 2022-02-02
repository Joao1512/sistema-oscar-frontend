import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerfisFormComponent } from './perfis-form.component';

const routes: Routes = [
  {
    path: '',
    component: PerfisFormComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PerfisFormRoutingModule { }
