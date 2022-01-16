import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrouppostPage } from './grouppost.page';

const routes: Routes = [
  {
    path: '',
    component: GrouppostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrouppostPageRoutingModule {}
