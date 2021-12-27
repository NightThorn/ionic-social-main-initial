import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopPage } from './shop.page';

const routes: Routes = [
  {
    path: '',
    component: ShopPage,
    children: [
      {
        path: '',
        redirectTo: '/shop/badges',
        pathMatch: 'full'
      },
      {
        path: 'merch',
        loadChildren: () => import('./merch/merch.module').then(m => m.MerchPageModule)
      },
      {
        path: 'badges',
        loadChildren: () => import('./badges/badges.module').then(m => m.BadgesPageModule)
      },
      {
        path: 'misc',
        loadChildren: () => import('./misc/misc.module').then(m => m.MiscPageModule)
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopPageRoutingModule {}
