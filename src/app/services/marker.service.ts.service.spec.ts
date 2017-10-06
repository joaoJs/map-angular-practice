import { TestBed, inject } from '@angular/core/testing';

import { MarkerService } from './marker.service';

describe('Marker.Service.TsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkerService]
    });
  });

  it('should be created', inject([MarkerService], (service: MarkerService) => {
    expect(service).toBeTruthy();
  }));
});
