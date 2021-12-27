import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XpmodalPage } from './xpmodal.page';

const routes: Routes = [
  {
    path: '',
    component: XpmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XpmodalPageRoutingModule {}
