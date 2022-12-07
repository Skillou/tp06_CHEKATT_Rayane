import { TestBed } from '@angular/core/testing';

import { CatalalogueService } from './catalalogue.service';

describe('CatalalogueService', () => {
  let service: CatalalogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalalogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
