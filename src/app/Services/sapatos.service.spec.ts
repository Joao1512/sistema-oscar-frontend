import { TestBed } from '@angular/core/testing';

import { SapatosService } from './sapatos.service';

describe('SapatosService', () => {
  let service: SapatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SapatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
