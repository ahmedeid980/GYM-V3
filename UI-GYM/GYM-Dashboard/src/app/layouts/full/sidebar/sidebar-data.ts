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
    displayName: 'User Profile',
    iconName: 'users',
    // route: `/${ROUTE_PAGES.GYM_NAME}/player-setting`,
  },
  {
    displayName: 'Player Profile',
    iconName: 'run',
    route: `/${ROUTE_PAGES.GYM_NAME}/player-setting`,
  },
  {
    navCap: 'Settings',
  },
  {
    displayName: 'Users',
    iconName: 'user',
    route: '/settings',
  },
  {
    displayName: 'Players',
    iconName: 'barbell',
    route: `/settings/${ROUTE_PAGES.GYM_NAME}/player-setting`,
  }
];
