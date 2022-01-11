import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicantPageRoutingModule } from './applicant-routing.module';

import { ApplicantPage } from './applicant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicantPageRoutingModule
  ],
  declarations: [ApplicantPage]
})
export class ApplicantPageModule {}
