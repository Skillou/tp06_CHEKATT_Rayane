import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CatalalogueService } from "../../Utils/Services/catalalogue.service";
import {Produit} from "../../model/Produit";

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.css']
})
export class ProduitDetailComponent implements OnInit {

  produit: Produit | undefined;

  constructor(private route: ActivatedRoute, private catalogueService: CatalalogueService) { }

  ngOnInit(): void {
    this.catalogueService.getCatalogue().subscribe(
      produits => this.produit = produits.find(p => p.id == this.route.snapshot.params['id'])
    );
  }
}
