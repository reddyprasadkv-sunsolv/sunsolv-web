import { RenderMode, ServerRoute } from '@angular/ssr';
import { publicPaths } from './core/site-data';

export const serverRoutes: ServerRoute[] = [
  ...publicPaths.map(
    (path) =>
      ({
        path: path === '/' ? '' : path.slice(1),
        renderMode: RenderMode.Prerender,
      }) satisfies ServerRoute,
  ),
  { path: '**', renderMode: RenderMode.Server },
];
