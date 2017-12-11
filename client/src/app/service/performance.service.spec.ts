import { TestBed, inject } from '@angular/core/testing';

import { PerformanceService } from './performance.service';

describe('PerformanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerformanceService]
    });
  });

  it('should be created', inject([PerformanceService], (service: PerformanceService) => {
    expect(service).toBeTruthy();
  }));
});
