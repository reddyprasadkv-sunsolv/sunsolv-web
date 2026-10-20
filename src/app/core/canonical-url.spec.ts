import { DefaultUrlSerializer } from '@angular/router';
import { allPublicPaths } from './site-data';
import { canonicalInternalUrl, CanonicalUrlSerializer } from './canonical-url';

describe('canonical public navigation', () => {
  const serializer = new CanonicalUrlSerializer();
  const parser = new DefaultUrlSerializer();

  it('round-trips all 65 public routes with query values and fragments intact', () => {
    expect(allPublicPaths).toHaveLength(65);
    for (const route of allPublicPaths) {
      const value = `${route}?enquiry=project&service=Cloud%20Solutions#founder`;
      const tree = parser.parse(value);
      const result = serializer.serialize(tree);
      const restored = parser.parse(result);
      expect(result.split('?')[0]).toBe(route === '/' ? '/' : `${route}/`);
      expect(restored.queryParams).toEqual(tree.queryParams);
      expect(restored.fragment).toBe('founder');
      expect(serializer.serialize(restored)).toBe(result);
    }
  });

  it('preserves asset URLs, external links, unknown routes and existing slashes', () => {
    for (const value of [
      '/images/sunsolv-logo.webp',
      '/api/enquiries',
      '/missing-page',
      'https://example.com/services',
      '//example.com/services',
      'mailto:info@sunsolv.in',
      '/services/?enquiry=project#details',
    ])
      expect(canonicalInternalUrl(value)).toBe(value);
    expect(canonicalInternalUrl('https://www.sunsolv.in/services?x=1#details')).toBe(
      'https://www.sunsolv.in/services/?x=1#details',
    );
  });
});
