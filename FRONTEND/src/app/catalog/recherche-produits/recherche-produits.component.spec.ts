import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheProduitsComponent } from './recherche-produits.component';

describe('RechercheProduitsComponent', () => {
  let component: RechercheProduitsComponent;
  let fixture: ComponentFixture<RechercheProduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheProduitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
