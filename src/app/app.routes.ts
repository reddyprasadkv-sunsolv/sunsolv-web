import { Routes } from '@angular/router';
import { pageRouteData, serviceRouteData } from './core/site-data';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: pageRouteData.home,
  },
  {
    path: 'about-us',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
    data: pageRouteData.about,
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services-overview/services-overview.component').then(
        (m) => m.ServicesOverviewComponent,
      ),
    data: pageRouteData.services,
  },
  { path: 'partnership', pathMatch: 'full', redirectTo: 'partnerships' },
  { path: 'terms-and-condition', pathMatch: 'full', redirectTo: 'terms-and-conditions' },
  {
    path: 'industries',
    loadComponent: () =>
      import('./pages/industries-overview/industries-overview.component').then(
        (m) => m.IndustriesOverviewComponent,
      ),
    data: pageRouteData.industries,
    resolve: {
      pageData: () =>
        import('./pages/industries-overview/industries-overview.data').then(
          (m) => m.industriesOverviewPageData,
        ),
    },
  },
  ...[
    ['case-studies', 'caseStudies'],
    ['partnerships', 'partnerships'],
    ['careers', 'careers'],
    ['privacy-policy', 'privacy'],
    ['terms-and-conditions', 'terms'],
  ].map(([path, key]) => ({
    path,
    loadComponent: () =>
      import('./pages/content-page/content-page.component').then((m) => m.ContentPageComponent),
    data: pageRouteData[key as keyof typeof pageRouteData],
  })),
  {
    path: 'services/it-consulting',
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(
        (m) => m.ServiceDetailComponent,
      ),
    resolve: {
      serviceData: () =>
        import('./pages/service-detail/it-consulting.data').then((m) => m.itConsultingPageData),
    },
  },
  {
    path: 'services/digital-transformation',
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(
        (m) => m.ServiceDetailComponent,
      ),
    resolve: {
      serviceData: () =>
        import('./pages/service-detail/digital-transformation.data').then(
          (m) => m.digitalTransformationPageData,
        ),
    },
  },
  {
    path: 'services/cloud-solutions',
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(
        (m) => m.ServiceDetailComponent,
      ),
    resolve: {
      serviceData: () =>
        import('./pages/service-detail/cloud-solutions.data').then((m) => m.cloudSolutionsPageData),
    },
  },
  {
    path: 'services/web-mobile-development',
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(
        (m) => m.ServiceDetailComponent,
      ),
    resolve: {
      serviceData: () =>
        import('./pages/service-detail/web-mobile-development.data').then(
          (m) => m.webMobileDevelopmentPageData,
        ),
    },
  },
  {
    path: 'services/custom-software-development',
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(
        (m) => m.ServiceDetailComponent,
      ),
    resolve: {
      serviceData: () =>
        import('./pages/service-detail/custom-software-development.data').then(
          (m) => m.customSoftwareDevelopmentPageData,
        ),
    },
  },
  {
    path: 'services/ai-machine-learning',
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(
        (m) => m.ServiceDetailComponent,
      ),
    resolve: {
      serviceData: () =>
        import('./pages/service-detail/ai-machine-learning.data').then(
          (m) => m.aiMachineLearningPageData,
        ),
    },
  },
  {
    path: 'services/digital-marketing',
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(
        (m) => m.ServiceDetailComponent,
      ),
    resolve: {
      serviceData: () =>
        import('./pages/service-detail/digital-marketing.data').then(
          (m) => m.digitalMarketingPageData,
        ),
    },
  },
  ...Object.entries(serviceRouteData)
    .filter(
      ([path]) =>
        path !== 'it-consulting' &&
        path !== 'digital-transformation' &&
        path !== 'cloud-solutions' &&
        path !== 'web-mobile-development' &&
        path !== 'custom-software-development' &&
        path !== 'ai-machine-learning' &&
        path !== 'digital-marketing',
    )
    .map(([path, data]) => ({
      path: `services/${path}`,
      loadComponent: () =>
        import('./pages/service-page/service-page.component').then((m) => m.ServicePageComponent),
      data,
    })),
  {
    path: 'contact-us',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
    data: pageRouteData.contact,
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    data: pageRouteData.notFound,
  },
];
