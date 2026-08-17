# Angular 22 migration record

Migration completed on 2026-08-17 using Angular's official `ng update` tooling.

## Migration process

The major-version migration was run with:

```bash
npx ng update @angular/cli@^22 @angular/core@^22 --allow-dirty
```

Angular's package group update aligned the framework, CLI, build, SSR, and TypeScript packages and ran the required Angular 22 source/configuration migrations. No `--force`, `--legacy-peer-deps`, prerelease Angular/toolchain package, or peer-dependency override was used. The lockfile does contain Babel's expected transitive development dependency `gensync@1.0.0-beta.2`; it is not a direct project dependency or an Angular prerelease.

## Version changes

| Package/runtime | Before | After |
| --- | --- | --- |
| Angular framework | 21.2.20 | 22.1.2 |
| Angular CLI | 21.2.20 | 22.1.4 |
| Angular build tooling | 21.2.20 | 22.1.4 |
| Angular SSR | 21.2.21 | 22.1.4 |
| TypeScript | 5.9.3 | 6.0.3 |
| RxJS | 7.8.2 | 7.8.2 |
| Node.js used for validation | 24.18.1 | 24.18.1 |

Angular CDK and Material were not installed before the migration and were not added.

## Applied migrations

- Added Angular 22's explicit `ChangeDetectionStrategy.Eager` compatibility setting to existing components.
- Added `withNoIncrementalHydration()` to preserve the application's existing hydration behavior.
- Applied Angular 22 workspace and compiler compatibility migrations.
- Removed an incompatible extended-diagnostics block generated alongside `strictTemplates: false`; this preserves the pre-upgrade template-checking behavior and restores a valid compiler configuration.

The optional application-builder migration was evaluated but not applied because it conflicts with the custom Express SSR/enquiry server at `src/server.ts`. Angular 22's compatible Webpack browser/server builders remain in use so SSR, custom HTTP behavior, prerendering, and deployment output remain unchanged. The build emits the expected deprecation notice, but no compatibility or runtime error.

## Files changed

Dependency and toolchain files:

- `package.json`
- `package-lock.json`

Required Angular 22 source migrations:

- `src/app/app.ts`
- `src/app/app.config.ts`
- `src/app/pages/home/home.component.ts`
- `src/app/pages/content-page/content-page.component.ts`
- `src/app/pages/service-page/service-page.component.ts`
- `src/app/pages/contact/contact.component.ts`
- `src/app/pages/not-found/not-found.component.ts`
- `src/app/shared/footer/footer.component.ts`
- `src/app/shared/header/header.component.ts`

Compiler compatibility files:

- `tsconfig.app.json`
- `tsconfig.server.json`
- `tsconfig.server-app.json`

Migration documentation:

- `README.md`
- `ANGULAR-22-MIGRATION.md`

The optional application-builder migration did not complete and made no changes to `angular.json` or `src/server.ts`. Their Webpack builders and custom Express implementation remain as they were before the Angular 22 migration.

## Validation

- Angular 22 production browser build: pass
- Angular 22 server and Express SSR builds: pass
- 17-route prerender: pass
- TypeScript checks: pass
- Unit tests: 4/4 pass
- Formatting: pass
- Production dependency audit: 0 vulnerabilities
- Direct routes, SEO files, 404s, legacy redirects, and enquiry validation: pass
- Browser hydration, desktop navigation, mobile focus trap, and contact-form invalid-focus behavior: pass

## Known warnings and future recommendation

- Angular 22 reports that the Webpack `browser` and `server` builders are deprecated.
- The unit-test builder warns that its configured browser build target is not the recommended application builder; the Vitest suite still completes successfully.
- Move to `@angular/build:application` in a separate, reviewable migration after the custom Express API, security headers, redirects, SSR host validation, prerender pipeline, and enquiry delivery path have an explicit application-builder-compatible design. Rerun the same browser, SSR, route, and form checks during that future migration.

No production deployment was performed as part of this migration.
