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

  // Tehchnique efficace : exactement :p

    @Action(RemoveProduct)
    removeProduct(ctx: StateContext<CartStateModel>, action: RemoveProduct): void {
      const state = ctx.getState();

      // ctx.setState({
      //   produits: state.produits.find(({ produit: { id } }) => id !== action.produit.id)
      // })


      // ctx.setState({
      //   produits: state.produits.find(({ produit: { id } }) => id !== action.produit.id)
      //   ? state.produits.map(({ produit, quantity }) => ({ produit, quantity: quantity - (produit.id === action.produit.id ? 1 : 0) }))
      //   : [...state.produits, { produit: action.produit, quantity: 1 }]
      // })
      // products: state.products.filter(
      //   (product, index) => index !== payload)

        // je devrais faire le remove all , je dois l'implémenter dans le state également ? je pense que c'est mieux oui mais ça te rajoute des trucs
      }
}

