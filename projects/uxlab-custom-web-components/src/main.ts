import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { provideZonelessChangeDetection } from '@angular/core';
import { TextboxComponent } from './app/web-components/textbox/textbox.component';
import { AddressManagerComponent } from './app/web-components/address-manager/address-manager.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

async function registerElements() {
  const app = await createApplication({
    providers: [
      provideZonelessChangeDetection(),
      provideHttpClient(withInterceptorsFromDi())
    ],
  });

  const textboxElement = createCustomElement(TextboxComponent, { injector: app.injector });
  customElements.define('uxlab-ele-textbox', textboxElement);

  const addressManager = createCustomElement(AddressManagerComponent, { injector: app.injector });
  customElements.define('uxlab-ele-address-manager', addressManager);
}

registerElements();
