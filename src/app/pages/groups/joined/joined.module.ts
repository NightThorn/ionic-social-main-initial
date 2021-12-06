import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinedPageRoutingModule } from './joined-routing.module';

import { JoinedPage } from './joined.page';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ComponentsModule,
    JoinedPageRoutingModule
  ],
  declarations: [JoinedPage]
})
export class JoinedPageModule {}
