import { Routes } from '@angular/router';
import { pageRouteData, serviceRouteData } from './core/site-data';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: pageRouteData.home,
  },
  { path: 'partnership', pathMatch: 'full', redirectTo: 'partnerships' },
  { path: 'terms-and-condition', pathMatch: 'full', redirectTo: 'terms-and-conditions' },
  ...[
    ['about-us', 'about'],
    ['services', 'services'],
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
  ...Object.entries(serviceRouteData).map(([path, data]) => ({
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
