import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinedPage } from './joined.page';

const routes: Routes = [
  {
    path: '',
    component: JoinedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinedPageRoutingModule {}
