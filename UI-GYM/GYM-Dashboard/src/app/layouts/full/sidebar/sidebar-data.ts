import { ROUTE_PAGES } from 'src/app/services/services/security/store-storage';
import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Information',
  },
  {
    displayName: 'Player Profile',
    iconName: 'run',
    route: `/${ROUTE_PAGES.GYM_NAME}/player-profile`,
  },
  {
    navCap: 'Settings',
  },
  {
    displayName: 'Users',
    iconName: 'user',
    route: `/settings/${ROUTE_PAGES.GYM_NAME}/user-setting`,
  },
  {
    displayName: 'Players',
    iconName: 'barbell',
    route: `/settings/${ROUTE_PAGES.GYM_NAME}/player-setting`,
  },
  {
    displayName: 'Player Resubscription',
    iconName: 'stack-pop',
    route: `/settings/${ROUTE_PAGES.GYM_NAME}/resubscription-setting`,
  }
];
