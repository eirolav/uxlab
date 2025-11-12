import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { initFederation } from '@angular-architects/module-federation-runtime';


/* initFederation('{}')
.catch((err) => { debugger; console.log(err) })
.then(() => {
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
}); */

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
