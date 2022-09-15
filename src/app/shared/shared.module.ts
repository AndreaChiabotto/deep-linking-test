import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

const importExportModules: Array<Type<unknown>> = [
  FormsModule,
  ReactiveFormsModule,
  NgxsFormPluginModule,
  CommonModule
];

@NgModule({
  declarations: [],
  imports: [...importExportModules],
  exports: [...importExportModules],
})
export class SharedModule {}
