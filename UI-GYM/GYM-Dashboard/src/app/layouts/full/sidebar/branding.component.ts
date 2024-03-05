import { Component } from '@angular/core';
import { ENV } from 'src/app/services/services/security/store-storage';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="{{PRO_LOGO_IMAGE}}"
          width="200px"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
  PRO_LOGO_IMAGE = ENV.PRO_LOGO_IMAGE;
}
