import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.page.html',
  styleUrls: ['./applicant.page.scss'],
})
export class ApplicantPage implements OnInit, OnDestroy {
  data: any;
  apps: any;
  groupid: any;
  userFriends: any;
  friendCount: any;
  userBadges: any;
  badgeCount: any;
  groups: any;
  xp: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private activeRoute: ActivatedRoute, private router: Router, private http: HttpClient, private profileService: ProfileService, private dataService: DataService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.user) {
        this.data = JSON.parse(params.user);
        this.groupid = JSON.parse(params.group);

      }
    });
    this.dataService.getApplicant(this.groupid, this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      this.apps = res.message;
      this.xp = this.apps[0]['total_xp']
    });
    this.profileService.fetchFriends(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.userFriends = res.message;
      this.friendCount = this.userFriends.length;

    });
    this.profileService.fetchUser(this.data);
    this.profileService.fetchPosts(this.data);
    this.profileService.fetchBadges(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.userBadges = res.message;
      this.badgeCount = this.userBadges.length;
    });
    this.profileService.fetchGroups(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.groups = res.message;

    });

  }
  approve(user) {
    let data = {
      "userid": user,
    };
    this.http.post('https://ggs.tv/api/v1/group.php?action=approve&group=' + this.groupid, JSON.stringify(data)).subscribe(res => {
    });
  }
  decline(user) {
    let data = {
      "userid": user,
    };
    this.http.post('https://ggs.tv/api/v1/group.php?action=decline&group=' + this.groupid, JSON.stringify(data)).subscribe(res => {
    });
  }
  accept(user) {
    let data = {
      "userid": user,
    };
    this.http.post('https://ggs.tv/api/v1/group.php?action=accept&group=' + this.groupid, JSON.stringify(data)).subscribe(res => {
    });
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
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
