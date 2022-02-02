import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { PerfisFormComponent } from './perfis-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PerfisFormRoutingModule } from './perfis-form-routing.module';



@NgModule({
  declarations: [
    PerfisFormComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    PerfisFormRoutingModule,
  ]
})
export class PerfisFormModule { }
