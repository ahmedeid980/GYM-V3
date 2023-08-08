import { Routes } from '@angular/router';

import { PlayerSettingComponent } from '../player/player-settings/player-settings.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'player-setting',
        component: PlayerSettingComponent,
      },
    ],
  },
];
