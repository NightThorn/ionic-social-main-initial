import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.page.html',
  styleUrls: ['./applicant.page.scss'],
})
export class ApplicantPage implements OnInit {
  data: any;
  apps: any;
  groupid: any;
  userFriends: any;
  friendCount: any;
  userBadges: any;
  badgeCount: any;
  groups: any;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private profileService: ProfileService, private dataService: DataService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.user) {
        this.data = JSON.parse(params.user);
        this.groupid = JSON.parse(params.group);

      }
    });
    this.dataService.getApplicant(this.groupid, this.data).subscribe(res => {

      this.apps = res.message;
      console.log(this.apps);
    });
    this.profileService.fetchFriends(this.data).subscribe(res => {
      this.userFriends = res.message;
      this.friendCount = this.userFriends.length;

    });
    this.profileService.fetchUser(this.data);
    this.profileService.fetchPosts(this.data);
    this.profileService.fetchBadges(this.data).subscribe(res => {
      this.userBadges = res.message;
      this.badgeCount = this.userBadges.length;
    });
    this.profileService.fetchGroups(this.data).subscribe(res => {
      this.groups = res.message;

    });

  }
  accept(user) {


  }
  decline(user) {


  }
  badges(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/userbadges'], navigationExtras);
  }
  friends(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/userfriends'], navigationExtras).then(() => {
      window.location.reload();
    });
  }

}
