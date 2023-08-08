import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { STORAGE_ELEMENT } from 'src/app/services/services/security/store-storage';
import { IntegrationService } from 'src/app/services/services/serviceIntegration/integration.service';
import { StoreDataService } from 'src/app/services/services/storage/store-data.service';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { Player } from 'src/app/services/services/interfaces/classification';
import { AdminIntegrationService } from 'src/app/services/services/adminServiceIntegration/admin-integration.service';
import { MessageService } from 'src/app/services/services/message/message.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit{
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  user: any;
  token: String = "";
  unsubscription: any;
  confirmModal?: NzModalRef;

  constructor(public dialog: MatDialog, private route: Router, private storeService: StoreDataService,
    private integration: IntegrationService, private modal: NzModalService, private i18n: NzI18nService,
    private adminIntegration: AdminIntegrationService, private message: MessageService) {
    this.user = storeService.getStoreElement(STORAGE_ELEMENT.USER);
    this.token = storeService.getElementWthoutSecret(STORAGE_ELEMENT.TOKEN);

    this.getUnsubscriptionPlayerList(this.token);
  }

  ngOnInit() {
    this.i18n.setLocale(en_US);
  }

  logout() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to logout now?',
      // nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.1 ? resolve : reject, 1);
          localStorage.clear();
          this.route.navigate(['/authentication/login']);
        }).catch(() => console.log('Oops errors!'))
    });
    
  }

  getUnsubscriptionPlayerList(token: String) {
    this.integration.getPlayerListOfOutSuscription(token).subscribe(data => {
      if(data)
        this.unsubscription = data;
    })
  }

  getPlayer(player: Player) {
    console.log(player);
  }

  deletePlayer(player: Player) {
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you Want to delete Player <b>${player.playerName}</b> ?
      <span style='font-size:100px;'>&#128547;</span>
      `,
      // nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.1 ? resolve : reject, 1);
          
          this.adminIntegration.deletePlayerById(player.id, this.token).subscribe(data => {
            if(data) {
              this.message.createSuccessMessage(`Player ${player.playerName} deleted successfully`);
              this.getUnsubscriptionPlayerList(this.token);
      
            } else this.message.createErrorMessage(`Player ${player.playerName} not deleted`);
          });

        }).catch(() => console.log('Oops errors!'))
    });
    
  }

  adminProfile() {
    console.log(this.user);
    // navigate to admin profile.
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.unsubscription.filter = filterValue.trim().toLowerCase();
  }
}
