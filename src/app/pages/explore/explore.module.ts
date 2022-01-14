import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePageRoutingModule } from './explore-routing.module';
import { InViewportModule } from 'ng-in-viewport';
import { ModalPageModule } from '../modal/modal.module';
import { ExplorePage } from './explore.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InViewportModule,
    ExplorePageRoutingModule,
    ComponentsModule,
    ModalPageModule,

  ],
  declarations: [ExplorePage]
})
export class ExplorePageModule {}
