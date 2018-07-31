import { TestBed, inject } from '@angular/core/testing';

import { REsessionService } from './resession.service';

describe('REsessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [REsessionService]
    });
  });

  it('should be created', inject([REsessionService], (service: REsessionService) => {
    expect(service).toBeTruthy();
  }));
});
