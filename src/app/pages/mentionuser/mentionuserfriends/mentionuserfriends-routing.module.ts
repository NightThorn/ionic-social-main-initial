import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentionuserfriendsPage } from './mentionuserfriends.page';

const routes: Routes = [
  {
    path: '',
    component: MentionuserfriendsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentionuserfriendsPageRoutingModule {}
