import { TestBed } from '@angular/core/testing';

import { CityClientService } from './city-client.service';

describe('CityClientService', () => {
  let service: CityClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
