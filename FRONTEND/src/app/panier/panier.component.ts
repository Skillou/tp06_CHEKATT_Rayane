import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { EmptyCart, RemoveProduct } from "../Utils/Actions/panier.actions";
import { CartProduit, CartStateModel } from '../Utils/States/panier.states.model';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  protected readonly produits$ = this.store.select((state: { cart: CartStateModel }) => state.cart.produits);

  constructor(private readonly store: Store) { }

  ngOnInit(): void {
  }

  public removeProduct(productId: number) {
    this.store.dispatch(new RemoveProduct(productId));
  }

  // public removeAllProduct(produit: Produit) {
  //   this.store.dispatch(new RemoveAllProduct(produit));
  // }

  emptyCart() {
    this.store.dispatch(new EmptyCart());
  }
}
