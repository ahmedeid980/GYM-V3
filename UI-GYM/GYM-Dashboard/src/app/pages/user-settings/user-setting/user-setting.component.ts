import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AdminIntegrationService } from 'src/app/services/services/adminServiceIntegration/admin-integration.service';
import { MessageService } from 'src/app/services/services/message/message.service';
import { STORAGE_ELEMENT } from 'src/app/services/services/security/store-storage';
import { IntegrationService } from 'src/app/services/services/serviceIntegration/integration.service';
import { StoreDataService } from 'src/app/services/services/storage/store-data.service';
import { userNameOrEmailControl } from 'src/app/services/utiles/Utility';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit {

  constructor(
    private storeService: StoreDataService,
    private integration: IntegrationService,
    private adminIntegration: AdminIntegrationService,
    private message: MessageService,
    private modal: NzModalService
  ) {
    this.user = this.storeService.getStoreElement(STORAGE_ELEMENT.USER);
    this.token = this.storeService.getElementWthoutSecret(STORAGE_ELEMENT.TOKEN);
  }
  ngOnInit(): void {
    this.getAdminList(this.token);
  }

  formGroup = new FormGroup({
    'id': new FormControl('',[]),
    'username': new FormControl('',[Validators.required]),
    'email': new FormControl('',[Validators.required]),
    'password': new FormControl('',[Validators.required]),
  });

  isLoadingTwo = false;
  isUpdate: boolean = false;
  user;
  token: string;
  confirmModal?: NzModalRef;

  // get all user admin ...
  adminListInfo: any;
  getAdminList(token: string) {
    this.adminIntegration.getusersList(token).subscribe( adminList =>{
      if(adminList) {
        this.adminListInfo = adminList;
      }
    });
  }

  /**
   * add new user 
   * 
   * @param element 
   */
  addNewAdmin() {
    this.isLoadingTwo = true;
    if(this.formGroup.get('email')?.value) {
      let forNoDuplicateAdmin = this.adminListInfo.find( (element: any) => element.email.trim() === this.formGroup.get('email')?.value?.trim());
      
      // for no duplicate admin
      if(forNoDuplicateAdmin) {
        this.message.createWarningMessage(`please choose another email this email <b>${this.formGroup.get('email')?.value}</b> used before`); 
        return;
      }

      // add control to email
      let controlStatus = userNameOrEmailControl(this.formGroup.get('email')?.value!);
      if(controlStatus) {
        this.message.createWarningMessage('please your email must be have only . or _ and no special characters'); 
        return;
      }
    }

    if(this.adminListInfo.length === 3) {
      this.message.createWarningMessage('you can\'t enter more than 3 users');
    } else {
      if(this.formGroup.valid) {
        this.integration.reigsterUserAdmin(this.formGroup.value, this.token).subscribe( adminRegistered => {
          if(adminRegistered) {
            this.message.createSuccessMessage(`User ${this.formGroup.get('username')?.value} saved successfully`);
            this.formGroup.reset();
            this.getAdminList(this.token);
            this.isLoadingTwo = false;
          } else 
            this.message.createErrorMessage(`User ${this.formGroup.get('username')?.value} not saved`)
        });
      } else {
        this.message.createInfoMessage('Please enter all fields');
        this.isLoadingTwo = false;
      }
    }
    
  }

  deleteUser(event: any, user: any) {
    event.stopPropagation();
    console.log(user)

    if (this.adminListInfo?.length <= 1) {
      this.message.createWarningMessage(`You can not delete any other users`);
      return;
    }
    
    this.confirmModal = this.modal.confirm({
      nzTitle: `Do you want to delete User <b>${user.userName}</b> ?
      <span style='font-size:100px;'>&#128547;</span>
      `,
      // nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.1 ? resolve : reject, 1);
          
          this.adminIntegration.deleteUserAdminById(user.id, this.token).subscribe(data => {
            if(data) {
              this.message.createSuccessMessage(`User <b>${user.userName}</b> deleted successfully`);
              this.getAdminList(this.token);
      
            } else this.message.createErrorMessage(`User <b>${user.userName}</b> not deleted`);
          });

        }).catch(() => this.message.createErrorMessage('Oops something went wrong'))
    });
  }

  elementForUpdate: any;
  getUserToUpdate(user: any) {
    this.formGroup.get('username')?.setValue(user.userName);
    this.formGroup.get('email')?.setValue(user.username);
    this.formGroup.get('password')?.setValue('');
    this.isUpdate = true;
    this.elementForUpdate = user;
  }

  /**
   * update admin
   * @Author ahmed eid
   */
  updateAdmin() {

    if(this.formGroup.get('email')?.value) {
      let forNoDuplicateAdmin = this.adminListInfo.find( (element: any) => element.email.trim() === this.formGroup.get('email')?.value!.trim());
    
      // for no duplicate admin
      if(forNoDuplicateAdmin && (forNoDuplicateAdmin.id != this.elementForUpdate.id)) {
        this.message.createWarningMessage(`user ${this.elementForUpdate.username} found before`); 
        return;
      }

      // add control to email
      let controlStatus = userNameOrEmailControl(this.formGroup.get('email')?.value!);
      if(controlStatus) {
        this.message.createWarningMessage('please your email must be have only . or _ and no special characters'); 
        return;
      }
    }

    this.formGroup.get('id')?.setValue(this.elementForUpdate.id);
    if( this.formGroup.valid) {
      this.adminIntegration.updateUserAdmin(this.elementForUpdate.id, this.formGroup.value, this.token).subscribe( (updatedAdmin: any) => {
        if (updatedAdmin) {
          this.message.createSuccessMessage(`user ${updatedAdmin?.username} updated successfully`);
          this.getAdminList(this.token);
          this.refresh();
        } else this.message.createErrorMessage(`User ${this.elementForUpdate.username} not updated`);
      });
    }
    else {
      this.message.createInfoMessage('Please enter all fields');
      this.isLoadingTwo = false;
    }
  }

  refresh(): void {
    this.formGroup.reset();
    this.isUpdate = false;
    this.isLoadingTwo = false;
  }

}
