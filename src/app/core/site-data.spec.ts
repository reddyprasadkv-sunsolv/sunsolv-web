import { describe, expect, it } from 'vitest';
import { canonicalOrigin, publicPaths, services } from './site-data';

describe('site routing data', () => {
  it('defines the requested 17 canonical public routes', () => {
    expect(publicPaths).toHaveLength(17);
    expect(new Set(publicPaths).size).toBe(publicPaths.length);
    expect(publicPaths).toContain('/contact-us');
    expect(publicPaths).toContain('/terms-and-conditions');
  });

  it('defines seven unique service routes on the www canonical host', () => {
    expect(services).toHaveLength(7);
    expect(new Set(services.map(({ slug }) => slug)).size).toBe(7);
    expect(canonicalOrigin).toBe('https://www.sunsolv.in');
  });
});
