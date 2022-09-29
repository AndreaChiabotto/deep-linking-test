import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Page1Component} from "./pages/page1/page1.component";
import {DecryptComponent} from "./pages/decrypt/decrypt.component";

const routes: Routes = [
  { path: '', component: Page1Component },
  { path: 'page1', component: Page1Component },
  { path: 'decrypt', component: DecryptComponent },
  { path: '**', component: Page1Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
