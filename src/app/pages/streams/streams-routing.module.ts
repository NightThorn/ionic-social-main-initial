import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StreamsPage } from './streams.page';

const routes: Routes = [
  {
    path: '',
    component: StreamsPage, 
    children: [
      {
        path: '',
        redirectTo: '/streams/pro',
        pathMatch: 'full'
      },
  {
    path: 'pro',
    loadChildren: () => import('./pro/pro.module').then( m => m.ProPageModule)
  },
  {
    path: 'all',
    loadChildren: () => import('./all/all.module').then( m => m.AllPageModule)
  
}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreamsPageRoutingModule {}
