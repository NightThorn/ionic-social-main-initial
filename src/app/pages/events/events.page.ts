import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {


  events: any;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
  }



  eventDetail(item) {
    let navigationExtras: NavigationExtras = {
      state: {
        event: item
      }
    };
    this.router.navigate(['event-detail'], navigationExtras);
  }
}
