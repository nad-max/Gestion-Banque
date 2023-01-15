import { Routes } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AddCardComponent } from './add-card/add-card.component';
import { AddCheckComponent } from './add-check/add-check.component';
import { TransferComponent } from './transfer/transfer.component';
import { AccountComponent } from './account/account.component';
import { DemandesComponent } from './demandes/demandes.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			
			{
				path: 'alert',
				component: AlertComponent
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
			},
			{
				path: 'demandes',
				component: DemandesComponent
			}
		]
	}
];
