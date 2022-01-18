import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddadminPage } from './addadmin.page';

const routes: Routes = [
  {
    path: '',
    component: AddadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddadminPageRoutingModule {}
