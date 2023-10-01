import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing.module';

// ui components
import { MatNativeDateModule } from '@angular/material/core';
import { PlayerSettingComponent } from '../player/player-settings/player-settings.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import {MatStepperModule} from '@angular/material/stepper';
import { ResubscripeComponent } from '../resubscripe/resubscripe/resubscripe.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { SearchModule } from 'src/app/pipe/search.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserSettingComponent } from '../user-settings/user-setting/user-setting.component';
import { PlayerProfileComponent } from '../player-profile/player-profile/player-profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule, NzButtonModule, NzInputModule, NzIconModule,
    NzSelectModule, NzModalModule, NzEmptyModule, NzStepsModule,NzPopoverModule,
    MatStepperModule, SearchModule, MatExpansionModule,
  ],
  declarations: [ResubscripeComponent, PlayerSettingComponent, UserSettingComponent,
    PlayerProfileComponent],
  exports: [],
})
export class UicomponentsModule {}
