import { Routes } from '@angular/router';
import { pageRouteData, serviceRouteData } from './core/site-data';
import {
  cloudSolutionsPageData,
  digitalTransformationPageData,
  itConsultingPageData,
} from './pages/service-detail/service-detail-data';

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
  ...[
    ['industries', 'industries'],
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
    data: itConsultingPageData,
  },
  {
    path: 'services/digital-transformation',
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(
        (m) => m.ServiceDetailComponent,
      ),
    data: digitalTransformationPageData,
  },
  {
    path: 'services/cloud-solutions',
    loadComponent: () =>
      import('./pages/service-detail/service-detail.component').then(
        (m) => m.ServiceDetailComponent,
      ),
    data: cloudSolutionsPageData,
  },
  ...Object.entries(serviceRouteData)
    .filter(
      ([path]) =>
        path !== 'it-consulting' && path !== 'digital-transformation' && path !== 'cloud-solutions',
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
