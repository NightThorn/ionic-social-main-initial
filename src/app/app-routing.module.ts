import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {

    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule), canActivate: [IntroGuard, AutoLoginGuard]
  },

  {
    path: 'introduction',
    loadChildren: () => import('./pages/introduction/introduction.module').then(m => m.IntroductionPageModule)
  },

  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [IntroGuard, AuthGuard]
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingPageModule)
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
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule)
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
    path: 'user/:id',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserPageModule)
  },
  {
    path: 'badges',
    loadChildren: () => import('./pages/profile/badges/badges.module').then(m => m.BadgesPageModule)
  },
  {
    path: 'userbadges/:id',
    loadChildren: () => import('./pages/user/userbadges/userbadges.module').then(m => m.UserbadgesPageModule)
  },
  {
    path: 'userfriends/:id',
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
    path: 'group/:id',
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
    path: 'members/:id',
    loadChildren: () => import('./pages/group/members/members.module').then(m => m.MembersPageModule)
  },
  {
    path: 'xpmodal',
    loadChildren: () => import('./pages/xpmodal/xpmodal.module').then(m => m.XpmodalPageModule)
  },
  {
    path: 'buymodal',
    loadChildren: () => import('./pages/buymodal/buymodal.module').then(m => m.BuymodalPageModule)
  },
  {
    path: 'buymerchmodal',
    loadChildren: () => import('./pages/buymerchmodal/buymerchmodal.module').then(m => m.BuymerchmodalPageModule)
  },
  {
    path: 'miscmodal',
    loadChildren: () => import('./pages/miscmodal/miscmodal.module').then(m => m.MiscmodalPageModule)
  },
  {
    path: 'ticketmodal',
    loadChildren: () => import('./pages/ticketmodal/ticketmodal.module').then(m => m.TicketmodalPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then(m => m.ModalPageModule)
  },
  {
    path: 'entergiveawaymodal',
    loadChildren: () => import('./pages/entergiveawaymodal/entergiveawaymodal.module').then(m => m.EntergiveawaymodalPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./pages/edit/edit.module').then(m => m.EditPageModule)
  },
  {
    path: 'blocked',
    loadChildren: () => import('./pages/blocked/blocked.module').then(m => m.BlockedPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./pages/password/password.module').then(m => m.PasswordPageModule)
  },
  {
    path: 'editgroup',
    loadChildren: () => import('./pages/editgroup/editgroup.module').then(m => m.EditgroupPageModule)
  },
  {
    path: 'apply',
    loadChildren: () => import('./pages/apply/apply.module').then(m => m.ApplyPageModule)
  },
  {
    path: 'applications',
    loadChildren: () => import('./pages/applications/applications.module').then(m => m.ApplicationsPageModule)
  },
  {
    path: 'applicant',
    loadChildren: () => import('./pages/applicant/applicant.module').then(m => m.ApplicantPageModule)
  },
  {
    path: 'grinding',
    loadChildren: () => import('./pages/grinding/grinding.module').then(m => m.GrindingPageModule)
  },
  {
    path: 'creategroup',
    loadChildren: () => import('./pages/creategroup/creategroup.module').then(m => m.CreategroupPageModule)
  },
  {
    path: 'grind',
    loadChildren: () => import('./pages/grind/grind.module').then(m => m.GrindPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./pages/editprofile/editprofile.module').then(m => m.EditprofilePageModule)
  },
  {
    path: 'giphy',
    loadChildren: () => import('./pages/giphy/giphy.module').then(m => m.GiphyPageModule)
  },
  {
    path: 'grouppost',
    loadChildren: () => import('./pages/grouppost/grouppost.module').then(m => m.GrouppostPageModule)
  },
  {
    path: 'groupadmins',
    loadChildren: () => import('./pages/groupadmins/groupadmins.module').then(m => m.GroupadminsPageModule)
  },
  {
    path: 'addadmin',
    loadChildren: () => import('./pages/addadmin/addadmin.module').then(m => m.AddadminPageModule)
  },
  {
    path: 'sharemodal',
    loadChildren: () => import('./pages/sharemodal/sharemodal.module').then(m => m.SharemodalPageModule)
  },
  {
    path: 'newchat',
    loadChildren: () => import('./pages/newchat/newchat.module').then(m => m.NewchatPageModule)
  },
  {
    path: 'mentionuser',
    loadChildren: () => import('./pages/mentionuser/mentionuser.module').then(m => m.MentionuserPageModule)
  },
  {
    path: 'mentionuserbadges',
    loadChildren: () => import('./pages/mentionuser/mentionuserbadges/mentionuserbadges.module').then(m => m.MentionuserbadgesPageModule)
  },
  {
    path: 'mentionuserfriends',
    loadChildren: () => import('./pages/mentionuser/mentionuserfriends/mentionuserfriends.module').then(m => m.MentionuserfriendsPageModule)
  },
  {
    path: 'introduction',
    loadChildren: () => import('./pages/introduction/introduction.module').then(m => m.IntroductionPageModule)
  },
  {
    path: 'editpostmodal',
    loadChildren: () => import('./pages/editpostmodal/editpostmodal.module').then(m => m.EditpostmodalPageModule)
  },  {
    path: 'muted',
    loadChildren: () => import('./pages/muted/muted.module').then( m => m.MutedPageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
