import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.page.html',
  styleUrls: ['./badges.page.scss'],
})
export class BadgesPage implements OnInit {
  badges: any;
  pro: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBadgeShop().subscribe(res => {
      this.badges = res.message;
      for (let i = 0; i < this.badges.length; i++) {
        if (this.badges[i]['price'] == '0.00' && this.badges[i]['pro_only'] == '0') {
          this.badges[i]['price'] = "Free";

        } else if (this.badges[i]['price'] == '0.00' && this.badges[i]['pro_only'] == '1') {
          this.badges[i]['price'] = "Pro Exclusive";
        }
      }
    });
  }
}
