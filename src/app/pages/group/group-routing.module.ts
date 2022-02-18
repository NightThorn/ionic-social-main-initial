import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupPage } from './group.page';

const routes: Routes = [
  {
    path: '',
    component: GroupPage,
    children: [
      {
        path: ':id',
        component: GroupPage,
        children: [
          {
            path: 'members/:id',
            loadChildren: () => import('./members/members.module').then(m => m.MembersPageModule)
          }


        ]
      }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupPageRoutingModule { }
