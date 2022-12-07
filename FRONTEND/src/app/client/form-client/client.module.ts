import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailClientComponent} from "../detail-client/detail-client.component";
import {FormClientComponent} from "./form-client.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  { path: 'register', component: FormClientComponent },
  { path: 'result', component: DetailClientComponent }
];

@NgModule({
  declarations: [
    FormClientComponent,
    DetailClientComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})


export class ClientModule { }
