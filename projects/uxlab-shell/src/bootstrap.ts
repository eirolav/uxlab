import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';



/* initFederation('{}')
.catch((err) => { debugger; console.log(err) })
.then(() => {
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
}); */

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
