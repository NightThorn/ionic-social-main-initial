import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentionuserbadgesPage } from './mentionuserbadges.page';

const routes: Routes = [
  {
    path: '',
    component: MentionuserbadgesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentionuserbadgesPageRoutingModule {}
