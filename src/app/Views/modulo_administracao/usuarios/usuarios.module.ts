import { MatCardModule } from '@angular/material/card';
import { UsuariosComponent } from './usuarios.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';




@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatSnackBarModule,
    UsuariosRoutingModule,
  ]
})
export class UsuariosModule { }
