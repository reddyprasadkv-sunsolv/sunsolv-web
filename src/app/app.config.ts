import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, UrlSerializer, withInMemoryScrolling } from '@angular/router';

import { CanonicalUrlSerializer } from './core/canonical-url';
import { routes } from './app.routes';
import { provideClientHydration, withNoIncrementalHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    { provide: UrlSerializer, useClass: CanonicalUrlSerializer },
    provideClientHydration(withNoIncrementalHydration()),
    provideHttpClient(withFetch()),
  ],
};
