import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PerfisComponent } from './perfis.component';

const routes: Routes = [
  {
    path:'',
    component: PerfisComponent
  },
  {
    path:'cadastrar',
    loadChildren: () => import('./perfis-form/perfis-form.module').then(m => m.PerfisFormModule)
  },
  {
    path:'editar/:id',
    loadChildren: () => import('./perfis-form/perfis-form.module').then(m => m.PerfisFormModule)
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
export class PerfisRoutingModule { }
