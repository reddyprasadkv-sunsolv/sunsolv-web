import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

export interface WebVitalMetric {
  name: 'CLS' | 'FCP' | 'INP' | 'LCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly platformId = inject(PLATFORM_ID);
  private initialized = false;

  init(): void {
    if (!isPlatformBrowser(this.platformId) || this.initialized) return;
    this.initialized = true;

    if (typeof PerformanceObserver === 'undefined') return;

    this.observeLcp();
    this.observeCls();
    this.observeFcp();
  }

  private observeLcp(): void {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const value = Math.round(lastEntry.startTime);
          const rating = value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor';
          this.recordMetric({ name: 'LCP', value, rating });
        }
      });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {
      // PerformanceObserver type may not be supported by older browsers
    }
  }

  private observeCls(): void {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries() as any[]) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        const rating = clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor';
        this.recordMetric({ name: 'CLS', value: Math.round(clsValue * 1000) / 1000, rating });
      });
      observer.observe({ type: 'layout-shift', buffered: true });
    } catch {
      // Supported in modern Chromium/WebKit
    }
  }

  private observeFcp(): void {
    try {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            const value = Math.round(entry.startTime);
            const rating = value <= 1800 ? 'good' : value <= 3000 ? 'needs-improvement' : 'poor';
            this.recordMetric({ name: 'FCP', value, rating });
          }
        }
      });
      observer.observe({ type: 'paint', buffered: true });
    } catch {
      // Ignore if unsupported
    }
  }

  private recordMetric(metric: WebVitalMetric): void {
    if (typeof console !== 'undefined' && console.debug) {
      console.debug(`[Web Vitals] ${metric.name}: ${metric.value} (${metric.rating})`);
    }
  }
}
