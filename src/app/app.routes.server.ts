import { RenderMode, ServerRoute } from '@angular/ssr';
import { allPublicPaths } from './core/site-data';

export const serverRoutes: ServerRoute[] = [
  ...allPublicPaths.map(
    (path) =>
      ({
        path: path === '/' ? '' : path.slice(1),
        renderMode: RenderMode.Prerender,
      }) satisfies ServerRoute,
  ),
  { path: '**', renderMode: RenderMode.Server },
];
