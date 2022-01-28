import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupPageRoutingModule } from './group-routing.module';

import { GroupPage } from './group.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ApplyPageModule } from '../../apply/apply.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    GroupPageRoutingModule,
    ApplyPageModule
    
  ],
  declarations: [GroupPage]
})
export class GroupPageModule { }
