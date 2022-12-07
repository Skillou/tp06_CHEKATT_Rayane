import {Component} from '@angular/core';
import {Produit} from '../../model/Produit';
import {RechercheProduitsService} from "../../Utils/Services/recherche-produits.service";
import {AddProduct} from "../../Utils/Actions/panier.actions";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],

})
export class CatalogueComponent {

  constructor(protected readonly service: RechercheProduitsService, private store: Store) {}

  public getProductId(_: number, item: Produit): number {
    return item.id;
  }

  public addProduct(produit: Produit) {
    this.store.dispatch(new AddProduct(produit));
  }
}
