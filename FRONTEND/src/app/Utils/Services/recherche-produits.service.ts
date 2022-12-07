import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, debounceTime, map} from "rxjs";
import {CatalalogueService} from "./catalalogue.service";
import {Produit} from "../../model/Produit";
import { Category, CategoryName } from "../../model/Produit";

@Injectable({
  providedIn: 'root'
})
export class RechercheProduitsService {
  private readonly _searchSubject$ = new BehaviorSubject<string>('');
  private readonly _categorySubject$ = new BehaviorSubject<CategoryName[]>([]);

  public readonly produits$ = combineLatest([
    this.catalalogueService.getCatalogue(),
    this._searchSubject$,
    this._categorySubject$
  ]).pipe(
    map(([produits, search, categories]: [Produit[], string, CategoryName[]]): Produit[] => produits.filter(
      (produit: Produit): boolean =>
        produit.name.toLowerCase().includes(search.toLowerCase()) && !categories.length || categories.includes(produit.category),
        // debounceTime(300),
    ))
  );

  constructor(private readonly catalalogueService: CatalalogueService) {
  }

  public searchProducts(search: string): void {
    this._searchSubject$.next(search);
  }

  public categoryProducts(category: Category): void {
    this._categorySubject$.next(
      Object.entries(category)
        .filter(([, isOfCategory]) => isOfCategory)
        .map(([categoryName]) => categoryName as CategoryName)
    );
  }
}
