import {Produit} from "../../model/Produit";

export class AddProduct {
  static readonly type = "[Cart] AddProduct";
  constructor(public produit: Produit) {}
}

export class ModifyProduct {
  static readonly type = "[Cart] ModifyProduct";
}

export class RemoveProduct {
  static readonly type = "[Cart] RemoveProduct";
  constructor(public produit: Number) {}
}

export class RemoveAllProduct {
  static readonly type = "[Cart] RemoveAllProduct";
  constructor(public produit: Produit) {}
}

export class EmptyCart {
  static readonly type = "[Cart] EmptyCart";
}
