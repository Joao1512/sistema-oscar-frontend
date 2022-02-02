import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SapatosComponent } from './sapatos.component';

const routes: Routes = [
  {
    path:'',
    component: SapatosComponent
  },
  {
    path:'cadastrar',
    loadChildren: () => import('./sapatos-form/sapatos-form.module').then(m => m.SapatosFormModule)
  },
  {
    path:'editar/:id',
    loadChildren: () => import('./sapatos-form/sapatos-form.module').then(m => m.SapatosFormModule)
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
export class SapatosRoutingModule { }
