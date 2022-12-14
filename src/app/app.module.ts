import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsState} from "./state/forms/form.state";
import {NgxsModule} from "@ngxs/store";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
import {NgxsFormPluginModule} from "@ngxs/form-plugin";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {Page1Component} from "./pages/page1/page1.component";
import {SharedModule} from "./shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgTinyUrlModule} from "ng-tiny-url";
import {QRCodeModule} from "angularx-qrcode";
import {DecryptComponent} from "./pages/decrypt/decrypt.component";

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    DecryptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([FormsState]),
    NgxsStoragePluginModule.forRoot({
      key: [FormsState],
    }),
    FormsModule,
    NgTinyUrlModule,
    QRCodeModule,
    ReactiveFormsModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
