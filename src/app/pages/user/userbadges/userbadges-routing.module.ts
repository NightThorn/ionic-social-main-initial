import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserbadgesPage } from './userbadges.page';

const routes: Routes = [
  {
    path: '',
    component: UserbadgesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserbadgesPageRoutingModule {}
