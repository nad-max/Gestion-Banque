import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/component/account',
    title: 'Mes comptes',
    icon: 'bi bi-person-square',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/transfer',
    title: 'Transférer argent',
    icon: 'bi bi-cash-coin',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/add-account',
    title: 'Créer un nouveau compte',
    icon: 'bi bi-plus-square',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/add-card',
    title: 'Demander une carte',
    icon: 'bi bi-credit-card',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/add-check',
    title: 'Demander un chéquier',
    icon: 'bi bi-card-checklist',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/login',
    title: 'Déconnexion',
    icon: 'bi bi-power',
    class: '',
    extralink: false,
    submenu: []
  },

];
