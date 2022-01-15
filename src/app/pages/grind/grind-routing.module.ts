import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrindPage } from './grind.page';

const routes: Routes = [
  {
    path: '',
    component: GrindPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrindPageRoutingModule {}
