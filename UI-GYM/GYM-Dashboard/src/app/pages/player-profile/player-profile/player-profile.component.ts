import { UserService } from './../../../services/services/user/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AdminIntegrationService } from 'src/app/services/services/adminServiceIntegration/admin-integration.service';
import { Player } from 'src/app/services/services/interfaces/classification';
import { MessageService } from 'src/app/services/services/message/message.service';
import { STORAGE_ELEMENT } from 'src/app/services/services/security/store-storage';
import { IntegrationService } from 'src/app/services/services/serviceIntegration/integration.service';
import { StoreDataService } from 'src/app/services/services/storage/store-data.service';
import { getDateSubtract } from 'src/app/services/utiles/Utility';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent {

  constructor(private storeService: StoreDataService,
    private integration: IntegrationService,
    private adminIntegration: AdminIntegrationService,
    private message: MessageService,
    private modal: NzModalService,
    private userService: UserService,
    private route: Router 
  ) {
    this.user = storeService.getStoreElement(STORAGE_ELEMENT.USER);
    this.token = storeService.getElementWthoutSecret(STORAGE_ELEMENT.TOKEN);

    this.getUnsubscriptionPlayerList(this.token);
    this.getSubscriptionPlayerList(this.token);
  }

  user;
  token: string;
  unsubscription: Player[];
  subscription: Player[];
  selected: Player;
  player: Player;
  
  getUnsubscriptionPlayerList(token: String) {
    this.integration.getPlayerListOfOutSuscription(token).subscribe((data: Player[]) => {
      if(data)
        this.unsubscription = data;
    });
  }

  getSubscriptionPlayerList(token: String) {
    this.integration.getPlayerListOfInSuscription(token).subscribe((data: Player[]) => {
      if(data)
        this.subscription = data;
    });
  }

  numberOfDaysLeft: number;
  termSelectChanged(event: any) {
    this.integration.getPlayerByCode(event, this.token).subscribe(data => {
      if (data) {
        this.player = data;
        this.numberOfDaysLeft = getDateSubtract(data);
      }
    });
  }

  playerToResubscription() {
    this.userService.changePlayerSubscription(this.player);
    this.route.navigate(['/settings/center-gym/resubscription-setting'])
  }

  playerToUpdate() {
    this.userService.changePlayerUpdate(this.player);
    this.route.navigate(['/settings/center-gym/player-setting'])
  }

}
