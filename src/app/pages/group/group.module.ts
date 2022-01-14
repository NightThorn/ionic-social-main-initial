import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupPageRoutingModule } from './group-routing.module';

import { GroupPage } from './group.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ApplyPageModule } from '../apply/apply.module';
import { EditgroupPageModule } from '../editgroup/editgroup.module';
import { ApplicationsPageModule } from '../applications/applications.module';
import { GrindingPageModule } from '../grinding/grinding.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    GroupPageRoutingModule,
    ApplyPageModule,
    EditgroupPageModule,
    ApplicationsPageModule,
    GrindingPageModule
  ],
  declarations: [GroupPage]
})
export class GroupPageModule {}
