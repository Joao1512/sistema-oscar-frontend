import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MeuPerfilComponent } from './meu-perfil.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MeuPerfilRoutingModule } from './meu-perfil-routing.module';



@NgModule({
  declarations: [MeuPerfilComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MeuPerfilRoutingModule,
  ]
})
export class MeuPerfilModule { }
