import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-userbadges',
  templateUrl: './userbadges.page.html',
  styleUrls: ['./userbadges.page.scss'],
})
export class UserbadgesPage implements OnInit {

  

  res: any = [];
  public badges: any = [];
  activatedroute: any;
  fetchedBadges: any;
  data: any;
  id: any;

  constructor(private route: ActivatedRoute, private profileService: ProfileService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });

  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.profileService.fetchBadges(this.data).subscribe(res => {
      this.badges = res.message;
      console.log("logggg", this.badges[0]);
    });
  }

}

