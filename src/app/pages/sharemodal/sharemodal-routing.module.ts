import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharemodalPage } from './sharemodal.page';

const routes: Routes = [
  {
    path: '',
    component: SharemodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharemodalPageRoutingModule {}
