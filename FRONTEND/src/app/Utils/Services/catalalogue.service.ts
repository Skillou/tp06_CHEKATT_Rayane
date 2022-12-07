import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Produit} from "../../model/Produit";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class CatalalogueService {

  constructor(private http: HttpClient) { }

  env = environment;

  public getCatalogue() : Observable<Produit[]> {
    return this.http.get<Produit[]>(this.env.produits);
  };

  public getProductId(_: number, item: Produit): number {
    return item.id;
  }
}
