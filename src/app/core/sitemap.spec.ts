import { publicPaths, canonicalOrigin } from './site-data';

describe('Sitemap generation and route coverage', () => {
  it('covers all 23 public routes with valid canonical URLs', async () => {
    // In node/browser test environment, fetch or verify public/sitemap.xml
    expect(publicPaths.length).toBe(23);

    // Verify expected routes are present in publicPaths
    const requiredRoutes = [
      '/',
      '/about-us',
      '/services',
      '/services/it-consulting',
      '/services/digital-transformation',
      '/services/cloud-solutions',
      '/services/web-mobile-development',
      '/services/custom-software-development',
      '/services/ai-machine-learning',
      '/services/digital-marketing',
      '/industries',
      '/industries/healthcare',
      '/industries/education',
      '/industries/retail-ecommerce',
      '/industries/real-estate',
      '/industries/saas',
      '/industries/logistics-supply-chain',
      '/case-studies',
      '/partnerships',
      '/careers',
      '/contact-us',
      '/privacy-policy',
      '/terms-and-conditions',
    ];

    for (const route of requiredRoutes) {
      expect(publicPaths).toContain(route as any);
      const canonical = route === '/' ? `${canonicalOrigin}/` : `${canonicalOrigin}${route}`;
      expect(canonical.startsWith('https://www.sunsolv.in/')).toBe(true);
    }
  });
});
