import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from '@ngxs/store';
import { CartState } from '../Utils/States/panier.states';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  protected readonly produitsCount$ = this.store.select(CartState.countProduct);

  constructor(private readonly store: Store) { }

  ngOnInit(): void { }
}
