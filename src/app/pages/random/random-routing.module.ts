import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RandomPage } from './random.page';

const routes: Routes = [
  {
    path: '',
    component: RandomPage,
    children: [
      {
        path: '',
        redirectTo: '/random/clips',
        pathMatch: 'full'
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserPageModule)
      },
      {
        path: 'clips',
        loadChildren: () => import('./clips/clips.module').then(m => m.ClipsPageModule)
      },
      {
        path: 'stream',
        loadChildren: () => import('./stream/stream.module').then(m => m.StreamPageModule)
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RandomPageRoutingModule {}
