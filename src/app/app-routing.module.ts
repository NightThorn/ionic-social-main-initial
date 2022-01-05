import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
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
    path: 'userbadges',
    loadChildren: () => import('./pages/user/userbadges/userbadges.module').then(m => m.UserbadgesPageModule)
  },
  {
    path: 'userfriends',
    loadChildren: () => import('./pages/user/userfriends/userfriends.module').then(m => m.UserfriendsPageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./pages/profile/friends/friends.module').then(m => m.FriendsPageModule)
  },
  {
    path: 'video-modal',
    loadChildren: () => import('./pages/video-modal/video-modal.module').then(m => m.VideoModalPageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./pages/image-modal/image-modal.module').then(m => m.ImageModalPageModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('./pages/groups/groups.module').then(m => m.GroupsPageModule)
  },
  {
    path: 'group',
    loadChildren: () => import('./pages/group/group.module').then(m => m.GroupPageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'members',
    loadChildren: () => import('./pages/group/members/members.module').then(m => m.MembersPageModule)
  },
  {
    path: 'xpmodal',
    loadChildren: () => import('./pages/xpmodal/xpmodal.module').then( m => m.XpmodalPageModule)
  },  {
    path: 'buymodal',
    loadChildren: () => import('./pages/buymodal/buymodal.module').then( m => m.BuymodalPageModule)
  },
  {
    path: 'buymerchmodal',
    loadChildren: () => import('./pages/buymerchmodal/buymerchmodal.module').then( m => m.BuymerchmodalPageModule)
  },
  {
    path: 'miscmodal',
    loadChildren: () => import('./pages/miscmodal/miscmodal.module').then( m => m.MiscmodalPageModule)
  },
  {
    path: 'ticketmodal',
    loadChildren: () => import('./pages/ticketmodal/ticketmodal.module').then( m => m.TicketmodalPageModule)
  },
  {
    path: 'entergiveawaymodal',
    loadChildren: () => import('./pages/entergiveawaymodal/entergiveawaymodal.module').then( m => m.EntergiveawaymodalPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./pages/edit/edit.module').then( m => m.EditPageModule)
  },

  






];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
