import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BadgesPage } from '../badges/badges.page';
import { FriendsPage } from '../friends/friends.page';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: ':user_id',
        component: ProfilePage

      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule { }
