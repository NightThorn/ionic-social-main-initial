import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentDetailsPage } from './tournament-details.page';

const routes: Routes = [
  {
    path: '',
    component: TournamentDetailsPage,
   children: [
      {
        path: ':id',
        component: TournamentDetailsPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentDetailsPageRoutingModule {}
