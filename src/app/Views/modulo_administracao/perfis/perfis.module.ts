import { PerfisComponent } from './perfis.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfisRoutingModule } from './perfis-routing.module';
import {MatTableModule} from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { PerfisFormComponent } from './perfis-form/perfis-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    PerfisComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatSnackBarModule,
    PerfisRoutingModule,
  ]
})
export class PerfisModule { }
