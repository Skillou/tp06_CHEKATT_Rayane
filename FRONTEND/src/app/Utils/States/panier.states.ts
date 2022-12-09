import {Action, Selector, State, StateContext} from "@ngxs/store";
import {CartStateModel} from "./panier.states.model";
import {Injectable} from "@angular/core";
import {AddProduct, RemoveProduct} from "../Actions/panier.actions";

@State<CartStateModel>({
  name: "cart",
  defaults: {
    produits: []
  }
})

@Injectable()
export class CartState {
  @Selector()
  static countProduct(state: CartStateModel) {
    return state.produits.reduce((count, { quantity }) => count + quantity, 0);
  }

  @Action(AddProduct)
  addProduct(ctx: StateContext<CartStateModel>, action: AddProduct): void {
    const state = ctx.getState();
    ctx.setState({
      produits: state.produits.find(({ produit: { id } }) => id === action.produit.id)
        ? state.produits.map(({ produit, quantity }) => ({ produit, quantity: quantity + (produit.id === action.produit.id ? 1 : 0) }))
        : [...state.produits, { produit: action.produit, quantity: 1 }]
    });
  }

  // à modifier car ne retire pas le quantité 0
  @Action(RemoveProduct)
  removeProduct(ctx: StateContext<CartStateModel>, { produit: productId }: RemoveProduct): void {
    const state = ctx.getState();
    const productToRemove = state.produits.find(({ produit: { id } }) => id === productId);
    ctx.setState({
      produits: productToRemove?.quantity
        ? state.produits.map(({ produit, quantity }) => ({ produit, quantity: quantity - (produit.id === productId ? 1 : 0) }))
        : state.produits.filter(({produit: { id } }) => id !== productId)
    });
  }
}

