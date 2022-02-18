import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-mentionuserbadges',
  templateUrl: './mentionuserbadges.page.html',
  styleUrls: ['./mentionuserbadges.page.scss'],
})
export class MentionuserbadgesPage implements OnInit, OnDestroy {

  res: any = [];
  public badges: any = [];
  activatedroute: any;
  fetchedBadges: any;
  data: any;
  id: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private route: ActivatedRoute, private profileService: ProfileService, private router: Router) {
    this.route.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });

  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.profileService.fetchBadges(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.badges = res.message;
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
