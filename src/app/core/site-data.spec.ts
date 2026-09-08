import { describe, expect, it } from 'vitest';
import { canonicalOrigin, industries, industryNames, publicPaths, services } from './site-data';

describe('site routing data', () => {
  it('defines the requested 23 canonical public routes', () => {
    expect(publicPaths).toHaveLength(23);
    expect(new Set(publicPaths).size).toBe(publicPaths.length);
    expect(publicPaths).toContain('/contact-us');
    expect(publicPaths).toContain('/terms-and-conditions');
    expect(publicPaths).toContain('/industries/education');
    expect(publicPaths).toContain('/industries/retail-ecommerce');
    expect(publicPaths).toContain('/industries/real-estate');
    expect(publicPaths).toContain('/industries/saas');
    expect(publicPaths).toContain('/industries/logistics-supply-chain');
  });

  it('defines seven unique service routes on the www canonical host', () => {
    expect(services).toHaveLength(7);
    expect(new Set(services.map(({ slug }) => slug)).size).toBe(7);
    expect(canonicalOrigin).toBe('https://www.sunsolv.in');
  });

  it('defines the authoritative six-industry list with approved spelling', () => {
    expect(industryNames).toEqual([
      'Healthcare',
      'Education',
      'Retail & E-Commerce',
      'Real Estate',
      'SaaS',
      'Logistics & Supply Chain',
    ]);
    expect(industries.map(({ title }) => title)).toEqual(industryNames);
    expect(new Set(industryNames).size).toBe(6);
    expect(industryNames).not.toContain('E-Commerce');
    expect(industryNames).not.toContain('E-commerce');
    expect(industryNames).not.toContain('SAAS');
    expect(industryNames).not.toContain('Logistics and Supply');
  });
});
