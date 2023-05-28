import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { STORAGE_ELEMENT } from 'src/app/services/services/security/store-storage';
import { IntegrationService } from 'src/app/services/services/serviceIntegration/integration.service';
import { StoreDataService } from 'src/app/services/services/storage/store-data.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  user: any;
  token: String = "";
  unsubscription: any;

  constructor(public dialog: MatDialog, private route: Router, private storeService: StoreDataService,
    private integration: IntegrationService) {
    this.user = storeService.getStoreElement(STORAGE_ELEMENT.USER);
    this.token = storeService.getElementWthoutSecret(STORAGE_ELEMENT.TOKEN);

    this.getUnsubscriptionPlayerList(this.token);
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/authentication/login']);
  }

  getUnsubscriptionPlayerList(token: String) {
    this.integration.getPlayerListOfOutSuscription(token).subscribe(data => {
      if(data)
        this.unsubscription = data;
      console.log(data)
    })
  }
}
