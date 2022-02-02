import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SapatosFormComponent } from './sapatos-form.component';

const routes: Routes = [
  {
    path: '',
    component: SapatosFormComponent
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
export class SapatosFormRoutingModule { }
