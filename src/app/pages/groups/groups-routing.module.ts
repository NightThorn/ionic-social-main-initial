import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsPage } from './groups.page';

const routes: Routes = [
  {
    path: '',
    component: GroupsPage,
    children: [
      {
        path: '',
        redirectTo: '/groups/discover',
        pathMatch: 'full'
      },
      
      {
        path: 'discover',
        loadChildren: () => import('./discover/discover.module').then(m => m.DiscoverPageModule)
      },
      {
        path: 'joined',
        loadChildren: () => import('./joined/joined.module').then(m => m.JoinedPageModule)
      },
      {
        path: 'me',
        loadChildren: () => import('./me/me.module').then(m => m.MePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsPageRoutingModule {}
