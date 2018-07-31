import { TestBed, inject } from '@angular/core/testing';

import { REPisosService } from './repisos.service';

describe('REPisosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [REPisosService]
    });
  });

  it('should be created', inject([REPisosService], (service: REPisosService) => {
    expect(service).toBeTruthy();
  }));
});
