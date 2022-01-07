import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditgroupPage } from './editgroup.page';

const routes: Routes = [
  {
    path: '',
    component: EditgroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditgroupPageRoutingModule {}
