import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentionuserPage } from './mentionuser.page';

const routes: Routes = [
  {
    path: '',
    component: MentionuserPage,
    children: [
      {
        path: ':username',
        component: MentionuserPage
      }
    ]
  },
  {
    path: 'mentionuserfriends',
    loadChildren: () => import('./mentionuserfriends/mentionuserfriends.module').then(m => m.MentionuserfriendsPageModule)
  },
  {
    path: 'mentionuserbadges',
    loadChildren: () => import('./mentionuserbadges/mentionuserbadges.module').then(m => m.MentionuserbadgesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentionuserPageRoutingModule {}
