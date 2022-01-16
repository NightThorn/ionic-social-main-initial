import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiphyPage } from './giphy.page';

const routes: Routes = [
  {
    path: '',
    component: GiphyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiphyPageRoutingModule {}
