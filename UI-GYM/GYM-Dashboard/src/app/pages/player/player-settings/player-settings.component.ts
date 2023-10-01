import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AdminIntegrationService } from 'src/app/services/services/adminServiceIntegration/admin-integration.service';
import {
  Gender,
  Player,
} from 'src/app/services/services/interfaces/classification';
import { MessageService } from 'src/app/services/services/message/message.service';
import { STORAGE_ELEMENT } from 'src/app/services/services/security/store-storage';
import { IntegrationService } from 'src/app/services/services/serviceIntegration/integration.service';
import { StoreDataService } from 'src/app/services/services/storage/store-data.service';
import { UserService } from 'src/app/services/services/user/user.service';

@Component({
  selector: 'app-player-settings',
  templateUrl: './player-settings.component.html',
  styleUrls: ['./player-settings.component.scss'],
})
export class PlayerSettingComponent implements OnDestroy {
  user: any;
  token: string;
  genderList: Gender[];
  subTypeList: any;
  exerciseTypeList: any;
  isVisible = false;
  isUpdate = false;
  confirmModal?: NzModalRef;
  query: any; // for filter of player  //// search 

  // form Group of players
  formGroup = new FormGroup({
    playerName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    passportNumber: new FormControl('', [
      Validators.maxLength(20),
      Validators.minLength(10),
    ]),
    cardNumber: new FormControl('', [
      Validators.maxLength(14),
      Validators.minLength(14),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(11),
      Validators.minLength(11),
    ]),
    playerChampionships: new FormControl('', []),
    amountPaid: new FormControl('', [Validators.required]),
    sysSubtype: new FormControl(null, [Validators.required]),
    sysExerciseType: new FormControl(null, [Validators.required]),
    sysGender: new FormControl(null, [Validators.required]),
    height: new FormControl('', [Validators.required]),
    weight: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    amountRest: new FormControl('', []),
    id: new FormControl(null, []),
  });

  constructor(
    private storeService: StoreDataService,
    private integration: IntegrationService,
    private adminIntegration: AdminIntegrationService,
    private message: MessageService,
    private userService: UserService,
    private modal: NzModalService
  ) {
    this.user = storeService.getStoreElement(STORAGE_ELEMENT.USER);
    this.token = storeService.getElementWthoutSecret(STORAGE_ELEMENT.TOKEN);

    this.getGenderList(this.token);
    this.getExerciseList(this.token);
    this.getSubtypeList(this.token);

    this.info = this.userService.playerUpdateAsObservable.subscribe((player: any) => {
      if (player) {
        this.integration.getPlayerByCode(player?.code, this.token).subscribe(data => {
          this.getPlayer(data);
        })
      }
    })
  }

  info;
  ngOnDestroy(): void {
    this.info.unsubscribe();
    this.userService.changePlayerUpdate(null);
  }

  getGenderList(token: string) {
    this.integration
      .getGenderLookup(token)
      .subscribe((genderLookup: Gender[]) => {
        if (genderLookup.length > 0) {
          this.genderList = genderLookup;
        }
      });
  }

  getExerciseList(token: string) {
    this.integration
      .getExerciseLookup(token)
      .subscribe((exerciseLookup: any) => {
        if (exerciseLookup.length > 0) {
          this.exerciseTypeList = exerciseLookup;
        }
      });
  }

  getSubtypeList(token: string) {
    this.integration.getSubtypeLookup(token).subscribe((subtypeLookup: any) => {
      if (subtypeLookup.length > 0) {
        this.subTypeList = subtypeLookup;
      }
    });
  }

  /**
   * add new player
   *
   */
  // about save button
  isLoadingTwo = false;
  player: Player;
  addNewPlayer() {
    this.isLoadingTwo = true;
    if (this.formGroup.valid) {
      this.integration
        .addNewPlayer(this.formGroup.value, this.user.id, this.token)
        .subscribe((playerAdded: any) => {
          if (playerAdded) {
            this.player = playerAdded;
            // this.player.sysExerciseType = playerAdded?.sysExerciseType.id+"";
            // this.player.sysSubtype = playerAdded?.sysSubtype.id+"";
            // this.player.sysGender = playerAdded?.sysGender.id+"";
            this.message.createSuccessMessage(
              `player " ${this.player.playerName} " has been created successfully`
            );
            this.formGroup.reset();
            this.isLoadingTwo = false;
          } else {
            this.message.createWarningMessage(
              `sorry there is a warning message to inform you that we faced an error`
            );
          }
        });
    } else {
      this.message.createInfoMessage('Please enter all fields');
      this.isLoadingTwo = false;
    }
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
        console.log(players);
        if (players.length) this.PlayerList = players;
      });
  }

  playerUpdate: Player;
  getPlayer(player: any) {
    player.sysExerciseType = player?.sysExerciseType.id + '';
    player.sysSubtype = player?.sysSubtype.id + '';
    player.sysGender = player?.sysGender.id + '';

    this.formGroup.get('playerName')?.setValue(player.playerName);
    this.formGroup.get('address')?.setValue(player.address);
    this.formGroup.get('passportNumber')?.setValue(player.passportNumber);
    this.formGroup.get('cardNumber')?.setValue(player.cardNumber);
    this.formGroup.get('phone')?.setValue(player.phone);
    this.formGroup
      .get('playerChampionships')
      ?.setValue(player.playerChampionships);
    this.formGroup.get('amountPaid')?.setValue(player.amountPaid);
    this.formGroup.get('height')?.setValue(player.height);
    this.formGroup.get('age')?.setValue(player.age);
    this.formGroup.get('weight')?.setValue(player.weight);
    this.formGroup.get('amountRest')?.setValue(player.amountRest);
    this.formGroup.get('id')?.setValue(player.id);

    this.formGroup.get('sysSubtype')?.setValue(player.sysSubtype);
    this.formGroup.get('sysExerciseType')?.setValue(player.sysExerciseType);
    this.formGroup.get('sysGender')?.setValue(player.sysGender);

    this.isUpdate = true;

    this.handleCancel();

    this.playerUpdate = player;

  }

  updatePlayer(): void {
    if (this.formGroup.valid) 
      this.integration.updatePlayer(this.formGroup.value, this.playerUpdate.code, this.token).subscribe( (player: any) => {
          if (player) {
            this.message.createSuccessMessage(
              `player " ${this.formGroup.get('playerName')?.value} " has been updated successfully`
            );
            this.refresh();
          }
          else this.message.createErrorMessage("player not updated");
      })
    else {
      this.message.createInfoMessage('Please enter all fields');
      this.isLoadingTwo = false;
    }
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
              this.getAllPlayers();
      
            } else this.message.createErrorMessage(`Player ${player.playerName} not deleted`);
          });

        }).catch(() => this.message.createErrorMessage('Oops something went wrong'))
    });
    
  }

  refresh(): void {
    this.formGroup.reset();
    this.isUpdate = false;
    this.isLoadingTwo = false;
  }

}
