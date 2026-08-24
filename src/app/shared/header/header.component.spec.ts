import { DOCUMENT } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HeaderComponent } from './header.component';

@Component({ template: '' })
class RouteStubComponent {}

describe('HeaderComponent', () => {
  afterEach(() => {
    vi.useRealTimers();
    TestBed.inject(DOCUMENT).body.classList.remove('nav-open');
  });

  async function renderHeader() {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([{ path: 'services/:slug', component: RouteStubComponent }])],
    }).compileComponents();
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    return { fixture, component: fixture.componentInstance };
  }

  function mousePointerEvent(type: string): PointerEvent {
    const event = new Event(type, { bubbles: false }) as PointerEvent;
    Object.defineProperty(event, 'pointerType', { value: 'mouse' });
    return event;
  }

  it('opens the desktop Services menu on mouse hover with synchronized ARIA state', async () => {
    const { fixture } = await renderHeader();
    const menu = fixture.nativeElement.querySelector('.services-menu') as HTMLElement;
    const button = menu.querySelector('button') as HTMLButtonElement;

    menu.dispatchEvent(mousePointerEvent('pointerenter'));
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(button.getAttribute('aria-controls')).toBe('services-mega-menu');
    expect(fixture.nativeElement.querySelector('#services-mega-menu')).toBeTruthy();
  });

  it('keeps the dropdown open when the pointer returns before the close delay', async () => {
    vi.useFakeTimers();
    const { fixture, component } = await renderHeader();
    const menu = fixture.nativeElement.querySelector('.services-menu') as HTMLElement;

    menu.dispatchEvent(mousePointerEvent('pointerenter'));
    menu.dispatchEvent(mousePointerEvent('pointerleave'));
    vi.advanceTimersByTime(150);
    menu.dispatchEvent(mousePointerEvent('pointerenter'));
    vi.advanceTimersByTime(100);

    expect(component.servicesOpen()).toBe(true);
  });

  it('closes the dropdown 200ms after the mouse leaves the trigger and panel', async () => {
    vi.useFakeTimers();
    const { fixture, component } = await renderHeader();
    const menu = fixture.nativeElement.querySelector('.services-menu') as HTMLElement;

    menu.dispatchEvent(mousePointerEvent('pointerenter'));
    menu.dispatchEvent(mousePointerEvent('pointerleave'));
    vi.advanceTimersByTime(199);
    expect(component.servicesOpen()).toBe(true);

    vi.advanceTimersByTime(1);
    expect(component.servicesOpen()).toBe(false);
  });

  it('opens from Enter or Space and closes on Escape with focus restored', async () => {
    const { fixture, component } = await renderHeader();
    const document = TestBed.inject(DOCUMENT);
    const button = fixture.nativeElement.querySelector(
      '.services-menu button',
    ) as HTMLButtonElement;

    button.focus();
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(component.servicesOpen()).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await Promise.resolve();
    fixture.detectChanges();
    expect(component.servicesOpen()).toBe(false);
    expect(document.activeElement).toBe(button);

    button.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    expect(component.servicesOpen()).toBe(true);
  });

  it('keeps focus movement within the dropdown open and closes when focus leaves it', async () => {
    const { fixture, component } = await renderHeader();
    const menu = fixture.nativeElement.querySelector('.services-menu') as HTMLElement;
    const button = menu.querySelector('button') as HTMLButtonElement;

    button.click();
    fixture.detectChanges();
    const firstLink = menu.querySelector('.mega-links a') as HTMLAnchorElement;
    menu.dispatchEvent(new FocusEvent('focusout', { relatedTarget: firstLink, bubbles: true }));
    expect(component.servicesOpen()).toBe(true);

    const outsideLink = fixture.nativeElement.querySelector('a[routerlink="/industries"]') as
      HTMLAnchorElement | undefined;
    menu.dispatchEvent(
      new FocusEvent('focusout', { relatedTarget: outsideLink ?? document.body, bubbles: true }),
    );
    expect(component.servicesOpen()).toBe(false);
  });

  it('preserves mobile tap behavior and resets the submenu after navigation', async () => {
    const { fixture, component } = await renderHeader();
    const mobileToggle = fixture.nativeElement.querySelector('.mobile-toggle') as HTMLButtonElement;

    mobileToggle.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const summary = fixture.nativeElement.querySelector('.mobile-panel summary') as HTMLElement;
    const details = summary.closest('details') as HTMLDetailsElement;
    expect(summary.getAttribute('aria-expanded')).toBe('false');

    details.open = true;
    details.dispatchEvent(new Event('toggle'));
    fixture.detectChanges();
    expect(summary.getAttribute('aria-expanded')).toBe('true');

    const serviceLink = details.querySelector('a') as HTMLAnchorElement;
    serviceLink.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.mobileOpen()).toBe(false);
    expect(component.mobileServicesOpen()).toBe(false);
    expect(TestBed.inject(DOCUMENT).body.classList.contains('nav-open')).toBe(false);
  });
});
