import { TestBed, inject } from '@angular/core/testing';

import { LocalizameService } from './localizame.service';

describe('LocalizameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizameService]
    });
  });

  it('should be created', inject([LocalizameService], (service: LocalizameService) => {
    expect(service).toBeTruthy();
  }));
});
