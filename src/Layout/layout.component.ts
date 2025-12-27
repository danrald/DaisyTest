import {
  Component,
  HostListener,
  signal,
  computed
} from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

  private readonly DESKTOP_WIDTH = 1024;

  isDesktop = signal(window.innerWidth >= this.DESKTOP_WIDTH);

  primaryOpen = signal(this.isDesktop());
  secondaryOpen = signal(false);

  primaryTransform = computed(() =>
    this.primaryOpen() ? 'translateX(0)' : 'translateX(-100%)'
  );

  secondaryTransform = computed(() =>
    this.secondaryOpen() ? 'translateX(0)' : 'translateX(100%)'
  );

  mainTransform = computed(() => {
    let offset = 0;

    if (this.primaryOpen() && this.isDesktop()) offset += 16;
    if (this.secondaryOpen() && this.isDesktop()) offset -= 16;

    return `translateX(${offset}rem)`;
  });

  showBackdrop = computed(() =>
    (!this.isDesktop()) && (this.primaryOpen() || this.secondaryOpen())
  );

  togglePrimary() {
    this.primaryOpen.update(v => !v);
    if (!this.isDesktop()) this.secondaryOpen.set(false);
  }

  toggleSecondary() {
    this.secondaryOpen.update(v => !v);
    if (!this.isDesktop()) this.primaryOpen.set(false);
  }

  closeAll() {
    this.primaryOpen.set(false);
    this.secondaryOpen.set(false);
  }

  @HostListener('window:resize')
  onResize() {
    const desktop = window.innerWidth >= this.DESKTOP_WIDTH;

    if (desktop !== this.isDesktop()) {
      this.isDesktop.set(desktop);
      this.primaryOpen.set(desktop);
      this.secondaryOpen.set(false);
    }
  }
}
