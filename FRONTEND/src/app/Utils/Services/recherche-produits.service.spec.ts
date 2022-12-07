import { TestBed } from '@angular/core/testing';

import { RechercheProduitsService } from './recherche-produits.service';

describe('RechercheProduitsService', () => {
  let service: RechercheProduitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechercheProduitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
