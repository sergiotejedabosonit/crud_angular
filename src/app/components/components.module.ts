import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table/table.component';
import { FormComponent } from './form/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from '../material/ng-prime/ng-prime.module';
import { MaterialModule } from '../material/material/material.module';



@NgModule({
  declarations: [
    FormComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgPrimeModule,
    MaterialModule
  ],
  exports:[
    FormComponent, 
    TableComponent
  ]
})
export class ComponentsModule { }
