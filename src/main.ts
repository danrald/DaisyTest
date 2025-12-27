import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { LayoutComponent } from './Layout/layout.component';

bootstrapApplication(LayoutComponent, appConfig)
  .catch((err) => console.error(err));
