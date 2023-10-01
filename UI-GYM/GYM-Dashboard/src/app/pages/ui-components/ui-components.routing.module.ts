import { Routes } from '@angular/router';

import { PlayerSettingComponent } from '../player/player-settings/player-settings.component';
import { ResubscripeComponent } from '../resubscripe/resubscripe/resubscripe.component';
import { UserSettingComponent } from '../user-settings/user-setting/user-setting.component';
import { PlayerProfileComponent } from '../player-profile/player-profile/player-profile.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'player-setting',
        component: PlayerSettingComponent,
      },
      {
        path: 'resubscription-setting',
        component: ResubscripeComponent,
      },
      {
        path: 'user-setting',
        component: UserSettingComponent,
      },
      {
        path: 'player-profile',
        component: PlayerProfileComponent,
      },
    ],
  },
];
