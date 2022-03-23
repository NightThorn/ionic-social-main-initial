import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MutedPage } from './muted.page';

const routes: Routes = [
  {
    path: '',
    component: MutedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MutedPageRoutingModule {}
