import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight, heroBars3, heroChevronDown, heroXMark } from '@ng-icons/heroicons/outline';
import { services } from '../../core/site-data';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgIcon],
  providers: [provideIcons({ heroArrowRight, heroBars3, heroChevronDown, heroXMark })],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('menuButton') private menuButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('mobilePanel') private mobilePanel?: ElementRef<HTMLElement>;
  readonly services = services;
  readonly mobileOpen = signal(false);
  readonly servicesOpen = signal(false);
  private readonly document = inject(DOCUMENT);

  toggleMobile(): void {
    this.setMobile(!this.mobileOpen());
  }

  closeMobile(returnFocus = false): void {
    if (!this.mobileOpen()) return;
    this.setMobile(false);
    if (returnFocus) queueMicrotask(() => this.menuButton?.nativeElement.focus());
  }

  toggleServices(): void {
    this.servicesOpen.update((open) => !open);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.servicesOpen.set(false);
      this.closeMobile(true);
      return;
    }
    if (event.key !== 'Tab' || !this.mobileOpen()) return;
    const focusable = this.mobilePanel?.nativeElement.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && this.document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && this.document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private setMobile(open: boolean): void {
    this.mobileOpen.set(open);
    this.document.body.classList.toggle('nav-open', open);
    if (open)
      setTimeout(
        () => this.mobilePanel?.nativeElement.querySelector<HTMLElement>('button')?.focus(),
        0,
      );
  }
}
