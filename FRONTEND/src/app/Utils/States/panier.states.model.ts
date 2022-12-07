import {Produit} from "../../model/Produit";

export interface CartProduit {
  produit: Produit;
  quantity: number;
}

export class CartStateModel {
  produits!: CartProduit[];
}
