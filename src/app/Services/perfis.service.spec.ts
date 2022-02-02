
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PerfisService } from './perfis.service';

describe('PerfisService', () => {
  let service: PerfisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(PerfisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
