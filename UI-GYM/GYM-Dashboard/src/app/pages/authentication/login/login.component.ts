import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminIntegrationService } from 'src/app/services/services/adminServiceIntegration/admin-integration.service';
import { STORAGE_ELEMENT } from 'src/app/services/services/security/store-storage';
import { IntegrationService } from 'src/app/services/services/serviceIntegration/integration.service';
import { StoreDataService } from 'src/app/services/services/storage/store-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  constructor(private integrationService: IntegrationService, private route: Router, private storeSystem: StoreDataService) {}

  loginFormGroup = new FormGroup({
    'username': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required]),
  });

  login() {
    if(this.loginFormGroup.valid) {
      this.integrationService.login(this.loginFormGroup.value).subscribe( (data: any) => {
        if(data.user) {
          this.storeSystem.storeElement(STORAGE_ELEMENT.USER, data.user);
          this.storeSystem.storeElementWthoutSecret(STORAGE_ELEMENT.TOKEN, data.token);
          this.route.navigate(['/dashboard']);
        } else {
          console.log('username or password incorrect');
        }
    });
    }
    
  }
}
