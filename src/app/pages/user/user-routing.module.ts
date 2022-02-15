import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
    children: [
      {
        path: ':id',
        component: UserPage,
        children: [
          {
            path: 'userfriends/:id',
            loadChildren: () => import('./userfriends/userfriends.module').then(m => m.UserfriendsPageModule)
          },
          {
            path: 'userbadges/:id',
            loadChildren: () => import('./userbadges/userbadges.module').then(m => m.UserbadgesPageModule)
          }

        ]
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule { }
