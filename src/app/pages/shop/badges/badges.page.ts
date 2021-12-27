import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.page.html',
  styleUrls: ['./badges.page.scss'],
})
export class BadgesPage implements OnInit {
  badges: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBadgeShop().subscribe(res => {
      this.badges = res.message;
    });
  }
}
