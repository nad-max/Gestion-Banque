import { Routes } from '@angular/router';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { BadgeComponent } from './badge/badge.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AddCardComponent } from './add-card/add-card.component';
import { AddCheckComponent } from './add-check/add-check.component';
import { TransferComponent } from './transfer/transfer.component';
import { AccountComponent } from './account/account.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'table',
				component: TableComponent
			},
			{
				path: 'card',
				component: CardsComponent
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent
			},
			{
				path: 'badges',
				component: BadgeComponent
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent
			},
			{
				path: 'buttons',
				component: ButtonsComponent
			},
			{
				path: 'add-account',
				component: AddAccountComponent
			},
			{
				path: 'add-card',
				component: AddCardComponent
			},
			{
				path: 'add-check',
				component: AddCheckComponent
			},
			{
				path: 'transfer',
				component: TransferComponent
			},
			{
				path: 'account',
				component: AccountComponent
			}
		]
	}
];
