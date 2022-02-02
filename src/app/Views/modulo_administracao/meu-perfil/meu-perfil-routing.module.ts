import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MeuPerfilComponent } from './meu-perfil.component';

const routes: Routes = [
  {
    path: '',
    component: MeuPerfilComponent
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
export class MeuPerfilRoutingModule { }
