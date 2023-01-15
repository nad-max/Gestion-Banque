import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { AddAccountComponent } from './add-account/add-account.component';
import { AddCardComponent } from './add-card/add-card.component';
import { AddCheckComponent } from './add-check/add-check.component';
import { TransferComponent } from './transfer/transfer.component';
import { AccountComponent } from './account/account.component';
import { DemandesComponent } from './demandes/demandes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    AddAccountComponent,
    AddCardComponent,
    AddCheckComponent,
    TransferComponent,
    AccountComponent,
    DemandesComponent
  ]
})
export class ComponentsModule { }
