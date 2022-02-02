import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from './Guards/role.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full', data: {pagina: 'login', title: 'login'}},
  {path: '**', redirectTo: 'home', pathMatch: 'full', data: {pagina: 'home', title: 'home'}},

  //Administração
  {
    path: 'login',
    loadChildren: () => import('./Views/modulo_administracao/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./Views/modulo_administracao/usuarios/usuarios.module').then(m => m.UsuariosModule),
    canActivate: [RoleGuard],
    data: {role: "ROLE_VISUALIZAR_USUARIO"}
  },
  {
    path: 'perfis',
    loadChildren: () => import('./Views/modulo_administracao/perfis/perfis.module').then(m => m.PerfisModule),
    canActivate: [RoleGuard],
    data: {role: "ROLE_VISUALIZAR_PERFIL"}
  },
  {
    path: 'sapatos',
    loadChildren: () => import('./Views/modulo_sapatos/sapatos/sapatos.module').then(m => m.SapatosModule),
    canActivate: [RoleGuard],
    data: {role: "ROLE_VISUALIZAR_PERFIL"}
  },
  {
    path: 'meuPerfil',
    loadChildren: () => import('./Views/modulo_administracao/meu-perfil/meu-perfil.module').then(m => m.MeuPerfilModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

