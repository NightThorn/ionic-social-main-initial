import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'story/:id',
    loadChildren: () => import('./pages/story-viewer/story-viewer.module').then(m => m.StoryViewerPageModule)
  },
  {
    path: 'post-detail',
    loadChildren: () => import('./pages/post-detail/post-detail.module').then(m => m.PostDetailPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'comments',
    loadChildren: () => import('./pages/comments/comments.module').then(m => m.CommentsPageModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then(m => m.EventsPageModule)
  },
  {
    path: 'event-detail',
    loadChildren: () => import('./pages/event-detail/event-detail.module').then(m => m.EventDetailPageModule)
  },

  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },

  {
    path: 'tournaments',
    loadChildren: () => import('./pages/tournaments/tournaments.module').then(m => m.TournamentsPageModule)
  },
  {
    path: 'random',
    loadChildren: () => import('./pages/random/random.module').then(m => m.RandomPageModule)
  },
  {
    path: 'streams',
    loadChildren: () => import('./pages/streams/streams.module').then(m => m.StreamsPageModule)
  },
  
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserPageModule)
  },
  {
    path: 'badges',
    loadChildren: () => import('./pages/profile/badges/badges.module').then(m => m.BadgesPageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./pages/profile/friends/friends.module').then(m => m.FriendsPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
