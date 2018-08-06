import { TestBed, inject } from '@angular/core/testing';

import { ValoracionService } from './valoracion.service';

describe('ValoracionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValoracionService]
    });
  });

  it('should be created', inject([ValoracionService], (service: ValoracionService) => {
    expect(service).toBeTruthy();
  }));
});
