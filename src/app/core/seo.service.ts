import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { canonicalOrigin, PageData, SeoData } from './site-data';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() =>
        this.apply(this.deepest(this.router.routerState.snapshot.root).data as PageData),
      );
  }

  private deepest(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.deepest(route.firstChild) : route;
  }

  private apply(data: PageData): void {
    if (!data?.seo) return;
    const seo: SeoData = data.seo;
    const canonical = seo.path ? `${canonicalOrigin}/${seo.path}` : `${canonicalOrigin}/`;
    const socialImage = seo.image
      ? `${canonicalOrigin}${seo.image}`
      : `${canonicalOrigin}/images/sunsolv-technology-progress-hero.webp`;
    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: seo.type ?? 'website' });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({
      property: 'og:image',
      content: socialImage,
    });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({
      name: 'twitter:image',
      content: socialImage,
    });
    this.meta.updateTag({
      name: 'robots',
      content: seo.noIndex ? 'noindex, nofollow' : 'index, follow',
    });

    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = canonical;

    this.document.head.querySelector('#structured-data')?.remove();
    if (seo.noIndex) return;
    const script = this.document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(this.structuredData(data, canonical));
    this.document.head.appendChild(script);
  }

  private structuredData(data: PageData, canonical: string): object {
    const base = {
      '@context': 'https://schema.org',
      '@type': data.schemaType ?? 'WebPage',
      name: data.title,
      url: canonical,
    };
    if (data.schemaType === 'Service') {
      const service = {
        ...base,
        description: data.seo.description,
        provider: { '@type': 'Organization', name: 'SunSolv Technologies', url: canonicalOrigin },
      };
      if (!data.structuredBreadcrumbs?.length && !data.structuredFaqs?.length) return service;

      return {
        '@context': 'https://schema.org',
        '@graph': [
          service,
          ...(data.structuredBreadcrumbs?.length
            ? [
                {
                  '@type': 'BreadcrumbList',
                  itemListElement: data.structuredBreadcrumbs.map((breadcrumb, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: breadcrumb.name,
                    item: breadcrumb.path
                      ? `${canonicalOrigin}/${breadcrumb.path}`
                      : `${canonicalOrigin}/`,
                  })),
                },
              ]
            : []),
          ...(data.structuredFaqs?.length
            ? [
                {
                  '@type': 'FAQPage',
                  mainEntity: data.structuredFaqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
                  })),
                },
              ]
            : []),
        ],
      };
    }
    if (data.schemaType === 'AboutPage') {
      const organizationId = `${canonicalOrigin}/#organization`;
      return {
        '@context': 'https://schema.org',
        '@graph': [
          {
            ...base,
            description: data.seo.description,
            about: { '@id': organizationId },
          },
          {
            '@type': 'Organization',
            '@id': organizationId,
            name: 'SunSolv Technologies',
            url: canonicalOrigin,
            logo: `${canonicalOrigin}/images/sunsolv-logo.webp`,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${canonicalOrigin}/`,
              },
              { '@type': 'ListItem', position: 2, name: 'About Us', item: canonical },
            ],
          },
          {
            '@type': 'Person',
            name: 'Reddy Prasad K V',
            jobTitle: 'Founder & CEO',
            affiliation: { '@id': organizationId },
            image: `${canonicalOrigin}/images/about/prasad-founder.webp`,
          },
        ],
      };
    }
    if (canonical === `${canonicalOrigin}/`) {
      return {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            name: 'SunSolv Technologies',
            url: canonicalOrigin,
            logo: `${canonicalOrigin}/images/sunsolv-logo.webp`,
          },
          { '@type': 'WebSite', name: 'SunSolv Technologies', url: canonicalOrigin },
          base,
        ],
      };
    }
    return base;
  }
}
