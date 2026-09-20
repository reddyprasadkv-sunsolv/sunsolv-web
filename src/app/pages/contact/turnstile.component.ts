import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

interface TurnstileApi {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  reset(id: string): void;
  remove(id: string): void;
}
type TurnstileWindow = Window & { turnstile?: TurnstileApi };

@Component({
  selector: 'app-enquiry-verification',
  template: '<div #container></div><p role="status" aria-live="polite">{{ message() }}</p>',
  styles: ':host{display:block;min-height:65px}p{font-size:.8rem;margin:8px 0;color:#475569}',
})
export class TurnstileComponent {
  readonly siteKey = input.required<string>();
  readonly token = output<string>();
  readonly message = signal('Loading the security check…');
  private readonly container = viewChild.required<ElementRef<HTMLElement>>('container');
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private widgetId?: string;
  private api?: TurnstileApi;

  constructor() {
    afterNextRender(() => {
      void this.initialize();
    });
    this.destroyRef.onDestroy(() => {
      if (this.widgetId) this.api?.remove(this.widgetId);
    });
  }

  reset(): void {
    this.token.emit('');
    if (this.widgetId) this.api?.reset(this.widgetId);
  }

  private async initialize(): Promise<void> {
    try {
      const window = this.document.defaultView as TurnstileWindow | null;
      if (!window) return;
      if (!window.turnstile) {
        await new Promise<void>((resolve, reject) => {
          let script = this.document.querySelector<HTMLScriptElement>('#enquiry-turnstile-script');
          const fresh = !script;
          if (!script) {
            script = this.document.createElement('script');
            script.id = 'enquiry-turnstile-script';
            script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
            script.async = true;
          }
          const timer = setTimeout(() => finish(new Error('Security check unavailable')), 12000);
          const loaded = () => finish();
          const failed = () => finish(new Error('Security check unavailable'));
          const finish = (error?: Error) => {
            clearTimeout(timer);
            script!.removeEventListener('load', loaded);
            script!.removeEventListener('error', failed);
            if (error) {
              script!.remove();
              reject(error);
            } else resolve();
          };
          script.addEventListener('load', loaded, { once: true });
          script.addEventListener('error', failed, { once: true });
          if (fresh) this.document.head.appendChild(script);
        });
      }
      if (this.destroyRef.destroyed) return;
      this.api = window.turnstile;
      if (!this.api) throw new Error('Security check unavailable');
      this.widgetId = this.api.render(this.container().nativeElement, {
        sitekey: this.siteKey(),
        theme: 'light',
        size: 'flexible',
        callback: (token: string) => {
          this.token.emit(token);
          this.message.set('Security check complete.');
        },
        'expired-callback': () => {
          this.token.emit('');
          this.message.set('The security check expired. Please complete it again.');
        },
        'error-callback': () => {
          this.token.emit('');
          this.message.set(
            'The security check could not load. Refresh the page or email info@sunsolv.in.',
          );
        },
      });
      this.message.set('Complete the security check before sending.');
    } catch {
      if (!this.destroyRef.destroyed)
        this.message.set(
          'The security check could not load. Refresh the page or email info@sunsolv.in.',
        );
    }
  }
}
