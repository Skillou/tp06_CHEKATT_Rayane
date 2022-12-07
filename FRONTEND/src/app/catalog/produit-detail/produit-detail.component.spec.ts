import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitDetailComponent } from './produit-detail.component';

describe('ProduitDetailComponent', () => {
  let component: ProduitDetailComponent;
  let fixture: ComponentFixture<ProduitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
