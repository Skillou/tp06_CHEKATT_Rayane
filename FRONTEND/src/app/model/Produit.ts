export const categories = ['livre', 'manga', 'jeu'] as const;

export type CategoryName = typeof categories[number];

export type Category = Record<CategoryName, boolean>;

export class Produit {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public category: CategoryName;
  public image: string;
  public summary: string;


  constructor(produit: Produit) {
    this.id = produit.id;
    this.name = produit.name;
    this.description = produit.description;
    this.price = produit.price;
    this.category = produit.category;
    this.image = produit.image;
    this.summary = produit.summary;
  }
}
