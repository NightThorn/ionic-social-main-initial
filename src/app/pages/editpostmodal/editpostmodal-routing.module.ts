import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditpostmodalPage } from './editpostmodal.page';

const routes: Routes = [
  {
    path: '',
    component: EditpostmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditpostmodalPageRoutingModule {}
