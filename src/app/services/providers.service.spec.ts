import { TestBed } from '@angular/core/testing';

import { ProviderService } from './providers.service';

describe('ProviderService', () => {
  let service: ProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
