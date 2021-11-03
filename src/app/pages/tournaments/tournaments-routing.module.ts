import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentsPage } from './tournaments.page';

const routes: Routes = [
  {
    path: '',
    component: TournamentsPage, 
    children: [
      {
        path: '',
        redirectTo: '/tournaments/browse',
        pathMatch: 'full'
      },
      {
        path: 'browse',
        loadChildren: () => import('./browse/browse.module').then( m => m.BrowsePageModule)
      },
      {
        path: 'create',
        loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentsPageRoutingModule {}
