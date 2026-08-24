import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
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
export class HeaderComponent implements OnDestroy {
  @ViewChild('servicesButton') private servicesButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('menuButton') private menuButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('mobilePanel') private mobilePanel?: ElementRef<HTMLElement>;
  @ViewChild('mobileServices') private mobileServices?: ElementRef<HTMLDetailsElement>;
  readonly services = services;
  readonly mobileOpen = signal(false);
  readonly servicesOpen = signal(false);
  readonly mobileServicesOpen = signal(false);
  private readonly document = inject(DOCUMENT);
  private servicesCloseTimer?: ReturnType<typeof setTimeout>;

  toggleMobile(): void {
    this.setMobile(!this.mobileOpen());
  }

  closeMobile(returnFocus = false): void {
    this.resetMobileServices();
    if (!this.mobileOpen()) return;
    this.setMobile(false);
    if (returnFocus) queueMicrotask(() => this.menuButton?.nativeElement.focus());
  }

  toggleServices(): void {
    this.cancelServicesClose();
    this.servicesOpen.update((open) => !open);
  }

  toggleServicesFromKeyboard(event: Event): void {
    event.preventDefault();
    this.toggleServices();
  }

  closeServices(returnFocus = false): void {
    this.cancelServicesClose();
    this.servicesOpen.set(false);
    if (returnFocus) queueMicrotask(() => this.servicesButton?.nativeElement.focus());
  }

  onServicesPointerEnter(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    this.cancelServicesClose();
    this.servicesOpen.set(true);
  }

  onServicesPointerLeave(event: PointerEvent): void {
    if (event.pointerType !== 'mouse') return;
    this.cancelServicesClose();
    this.servicesCloseTimer = setTimeout(() => this.servicesOpen.set(false), 200);
  }

  onServicesFocusOut(event: FocusEvent): void {
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && event.currentTarget instanceof HTMLElement) {
      if (event.currentTarget.contains(nextTarget)) return;
    }
    this.closeServices();
  }

  onMobileServicesToggle(open: boolean): void {
    this.mobileServicesOpen.set(open);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      if (this.mobileOpen()) {
        this.closeServices();
        this.closeMobile(true);
      } else if (this.servicesOpen()) {
        event.preventDefault();
        this.closeServices(true);
      }
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
    if (open) this.closeServices();
    else this.resetMobileServices();
    this.mobileOpen.set(open);
    this.document.body.classList.toggle('nav-open', open);
    if (open)
      setTimeout(
        () => this.mobilePanel?.nativeElement.querySelector<HTMLElement>('button')?.focus(),
        0,
      );
  }

  private cancelServicesClose(): void {
    if (this.servicesCloseTimer === undefined) return;
    clearTimeout(this.servicesCloseTimer);
    this.servicesCloseTimer = undefined;
  }

  private resetMobileServices(): void {
    this.mobileServicesOpen.set(false);
    if (this.mobileServices) this.mobileServices.nativeElement.open = false;
  }

  ngOnDestroy(): void {
    this.cancelServicesClose();
    this.document.body.classList.remove('nav-open');
  }
}
