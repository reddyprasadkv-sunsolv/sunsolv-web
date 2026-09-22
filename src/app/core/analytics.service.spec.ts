import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  it('initializes cleanly in browser platform', () => {
    TestBed.configureTestingModule({
      providers: [AnalyticsService, { provide: PLATFORM_ID, useValue: 'browser' }],
    });

    service = TestBed.inject(AnalyticsService);
    expect(service).toBeTruthy();
    expect(() => service.init()).not.toThrow();
    // Subsequent calls are idempotent
    expect(() => service.init()).not.toThrow();
  });

  it('no-ops safely in server platform', () => {
    TestBed.configureTestingModule({
      providers: [AnalyticsService, { provide: PLATFORM_ID, useValue: 'server' }],
    });

    service = TestBed.inject(AnalyticsService);
    expect(service).toBeTruthy();
    expect(() => service.init()).not.toThrow();
  });
});
