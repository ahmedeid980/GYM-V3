import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { AdminIntegrationService } from 'src/app/services/services/adminServiceIntegration/admin-integration.service';
import { Player } from 'src/app/services/services/interfaces/classification';
import { MessageService } from 'src/app/services/services/message/message.service';
import { STORAGE_ELEMENT } from 'src/app/services/services/security/store-storage';
import { IntegrationService } from 'src/app/services/services/serviceIntegration/integration.service';
import { StoreDataService } from 'src/app/services/services/storage/store-data.service';
import { UserService } from 'src/app/services/services/user/user.service';
import { getDateSubtract, getDaysFromSubtypeInfo, addDays } from 'src/app/services/utiles/Utility';

@Component({
  selector: 'app-resubscripe',
  templateUrl: './resubscripe.component.html',
  styleUrls: ['./resubscripe.component.scss']
})
export class ResubscripeComponent implements OnInit, OnDestroy {
  
  constructor(private storeService: StoreDataService,
    private integration: IntegrationService,
    private adminIntegration: AdminIntegrationService,
    private message: MessageService,
    private modalService: NzModalService,
    private modal: NzModalService, private userService: UserService) {
      this.user = this.storeService.getStoreElement(STORAGE_ELEMENT.USER);
      this.token = this.storeService.getElementWthoutSecret(STORAGE_ELEMENT.TOKEN);
      
      this.info = this.userService.playerSubscriptionAsObservable.subscribe(player => {
        if (player) {
          this.player = player;
          this.getPlayerInfoStatus = true;
          this.numberOfDaysLeft = getDateSubtract(player);
        } 
      });
    }

    info;
  ngOnDestroy(): void {
    this.info.unsubscribe();
    this.getPlayerInfoStatus = false;
    this.userService.changePlayerSubscription(null);
  }

    player: Player | null;

  ngOnInit(): void {
    this.getSubtypeList(this.token);
  }

  formGroup = new FormGroup({
    amountPaid: new FormControl('', [Validators.required]),
    amountRest: new FormControl('', []),
    modifiedDate: new FormControl(new Date(), []),
  });

  changeStrategy = new FormGroup({
    strategy: new FormControl(0, [Validators.required]),
  });

  @ViewChild(MatAccordion) accordion: MatAccordion;

  step = 0;
  user: any;
  token: string;
  isVisible = false;
  query: any; // for filter of player  //// search 
  getPlayerInfoStatus: boolean = false; 
  subscriptionStatus: boolean = false;

  setStep(index: number) {
    this.step = index;
  }

  showModal(): void {
    this.isVisible = true;
    this.getAllPlayers();
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  PlayerList: Player[];
  getAllPlayers(): void {
    this.adminIntegration
      .getPlayersList(this.token)
      .subscribe((players: any) => {
        if (players.length) this.PlayerList = players;
      });
  }

  numberOfDaysLeft: number;
  getToResubscription(player: Player) {
    if (player) {
      this.player = player;
      this.handleCancel();
      this.numberOfDaysLeft = getDateSubtract(player);
      this.getPlayerInfoStatus = true;
    }
  }

  subTypeList: any;
  getSubtypeList(token: string) {
    this.integration.getSubtypeLookup(token).subscribe((subtypeLookup: any) => {
      if (subtypeLookup.length > 0) {
        this.subTypeList = subtypeLookup;
      }
    });
  }

  resubscriptionPlayerSubscription() {
    if (!this.getPlayerInfoStatus) 
     this.message.createWarningMessage(`please select a player at first`);
    
    else {
      if (this.formGroup.valid) {
        this.formGroup.get('modifiedDate')?.setValue(new Date());
        this.integration.renewPlayerSubscription(this.formGroup.value, this.player?.code, this.token)
        .subscribe((status) => {
            if (status) {
              this.message
              .createSuccessMessage(`user ${this.player?.playerName} has successfully resubscription`);
              this.formGroup.reset();
              this.numberOfDaysLeft = getDaysFromSubtypeInfo(this.player!);
              this.integration.getPlayerByCode(this.player?.code, this.token)
                .subscribe((player: Player) => {
                  if (player) this.player = player;
              })
              this.subscriptionStatus = true;
              this.getUnsubscriptionPlayerList(this.token);
            }
            else this.message
            .createErrorMessage(`user ${this.player?.playerName} failed to resubscribe`)
        });
      } else this.message.createWarningMessage(`Fill in all required fields ("amount paid")`);
    }
  }

  resubscriptionPlayerWithGap() {
    if (!this.getPlayerInfoStatus) 
     this.message.createWarningMessage(`please select a player at first`);
    
    else {
      if (this.formGroup.valid) {
        const numberOfDaysLeft = getDateSubtract(this.player!);
        if (numberOfDaysLeft < 0) {
          this.formGroup.get('modifiedDate')?.setValue(addDays(Math.abs(numberOfDaysLeft), 
          new Date()));
        } else 
          this.formGroup.get('modifiedDate')?.setValue(new Date());
        this.integration.renewPlayerSubscription(this.formGroup.value, this.player?.code, this.token)
        .subscribe((status) => {
            if (status) {
              this.message
              .createSuccessMessage(`user ${this.player?.playerName} has successfully resubscription`);
              this.formGroup.reset();
              
              this.integration.getPlayerByCode(this.player?.code, this.token)
                .subscribe((player: Player) => {
                  if (player) this.player = player;
                  this.numberOfDaysLeft = getDateSubtract(player);
              })
              this.subscriptionStatus = true;
              this.getUnsubscriptionPlayerList(this.token);
            }
            else this.message
            .createErrorMessage(`user ${this.player?.playerName} failed to resubscribe`)
        });
      } else this.message.createWarningMessage(`Fill in all required fields ("amount paid")`);
    }
  }

  getUnsubscriptionPlayerList(token: String) {
    this.integration.getPlayerListOfOutSuscription(token).subscribe(data => {
      if(data)
        this.userService.changePlayerUnsubscriptionStatus(data);
    })
  }

  changePlayerSubscriptionStrategy() {
    if (this.changeStrategy.valid && this.changeStrategy.get('strategy')?.value != 0) {
      this.integration
      .changePlayerSubscriptionStrategy(this.changeStrategy.get('strategy')?.value!,
        this.player?.code, this.token).subscribe((player: Player) => {
          if (player) {
            this.player = player;
            this.numberOfDaysLeft = getDaysFromSubtypeInfo(player);
            this.changeStrategy.reset();
            this.message
            .createSuccessMessage(`player ${player.playerName} has changed subscription strategy successfully`);
          } else 
            this.message.createErrorMessage(`player ${this.player?.playerName} has failed to change subscription strategy`)
        })
    } else {
      this.message.createWarningMessage(`Fill in all required fields ("player subtype")`);
    }
  }

}
