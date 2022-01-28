import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationPage } from './notification.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationPage,
    children: [
      {
        path: '',
        redirectTo: 'notification/all',
        pathMatch: 'full'
      },
      {
        path: 'all',
        loadChildren: () => import('./all/all.module').then(m => m.AllPageModule)
      },
      {
        path: 'comments',
        loadChildren: () => import('./comments/comments.module').then(m => m.CommentsPageModule)
      },
      {
        path: 'likes',
        loadChildren: () => import('./likes/likes.module').then(m => m.LikesPageModule)
      },
      {
        path: 'connections',
        loadChildren: () => import('./connections/connections.module').then(m => m.ConnectionsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationPageRoutingModule { }
