import { TestBed } from '@angular/core/testing';

import { WeatherClientService } from './weather-client.service';

describe('WeatherClientService', () => {
  let service: WeatherClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
