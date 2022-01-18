import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupadminsPage } from './groupadmins.page';

const routes: Routes = [
  {
    path: '',
    component: GroupadminsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupadminsPageRoutingModule {}
