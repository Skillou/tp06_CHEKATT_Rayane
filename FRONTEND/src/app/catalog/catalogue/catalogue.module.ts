import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CatalogueComponent} from "./catalogue.component";
import {RechercheProduitsComponent} from "../recherche-produits/recherche-produits.component";
import {ProduitDetailComponent} from "../produit-detail/produit-detail.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  { path: '', component: CatalogueComponent, pathMatch: 'full' },
  { path: 'product/:id', component: ProduitDetailComponent }
];

@NgModule({
  declarations: [
    CatalogueComponent,
    RechercheProduitsComponent,
    ProduitDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CatalogueModule { }
