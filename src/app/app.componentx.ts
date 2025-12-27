import {
  Component,
  HostListener,
  signal,
  computed
} from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {

  private readonly DESKTOP_WIDTH = 1024;

  isDesktop = signal(window.innerWidth >= this.DESKTOP_WIDTH);
  sidebarOpen = signal(this.isDesktop());

  sidebarTransform = computed(() =>
    this.sidebarOpen() ? 'translateX(0)' : 'translateX(-100%)'
  );

  mainTransform = computed(() =>
    this.sidebarOpen() && this.isDesktop()
      ? 'translateX(16rem)'
      : 'translateX(0)'
  );

  showBackdrop = computed(() =>
    this.sidebarOpen() && !this.isDesktop()
  );

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }

  @HostListener('window:resize')
  onResize() {
    const desktop = window.innerWidth >= this.DESKTOP_WIDTH;

    if (desktop !== this.isDesktop()) {
      this.isDesktop.set(desktop);
      this.sidebarOpen.set(desktop); // reset default per breakpoint
    }
  }
}
