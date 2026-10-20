import { DefaultUrlSerializer, UrlTree } from '@angular/router';
import { allPublicPaths, canonicalOrigin } from './site-data';

const publicPaths = new Set<string>(allPublicPaths);

/** Align public navigation URLs with directory indexes, preserving queries and fragments. */
export function canonicalInternalUrl(value: string): string {
  const absolute = value.startsWith(`${canonicalOrigin}/`);
  const relative = absolute ? value.slice(canonicalOrigin.length) : value;
  if (!relative.startsWith('/') || relative.startsWith('//')) return value;
  const match = relative.match(/^([^?#]*)(.*)$/)!;
  const path = match[1].replace(/\/+$/, '') || '/';
  if (!publicPaths.has(path)) return value;
  const canonical = path === '/' ? '/' : `${path}/`;
  return `${absolute ? canonicalOrigin : ''}${canonical}${match[2]}`;
}

export class CanonicalUrlSerializer extends DefaultUrlSerializer {
  override serialize(tree: UrlTree): string {
    return canonicalInternalUrl(super.serialize(tree));
  }
}
