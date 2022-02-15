import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-userbadges',
  templateUrl: './userbadges.page.html',
  styleUrls: ['./userbadges.page.scss'],
})
export class UserbadgesPage implements OnInit {



  res: any = [];
  activatedroute: any;
  fetchedBadges: any;
  data: any;
  id: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  badges: any;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private router: Router) {


  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.profileService.fetchBadges(id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.badges = res.message;
      console.log(this.badges);
    });
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}

