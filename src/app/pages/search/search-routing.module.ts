import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPage } from './search.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPage,

    children: [
      {
        path: 'posts',
        loadChildren: () => import('./posts/posts.module').then(m => m.PostsPageModule)
      },
      {
        path: 'people',
        loadChildren: () => import('./people/people.module').then(m => m.PeoplePageModule)
      },
      {
        path: 'groups',
        loadChildren: () => import('./groups/groups.module').then(m => m.GroupsPageModule)
      },
      {
        path: '',
        redirectTo: 'search/posts',
        pathMatch: 'full'
      },]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule { }
