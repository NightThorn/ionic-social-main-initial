import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewchatPage } from './newchat.page';

const routes: Routes = [
  {
    path: '',
    component: NewchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewchatPageRoutingModule {}
