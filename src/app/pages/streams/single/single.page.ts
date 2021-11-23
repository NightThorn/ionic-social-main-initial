import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {
  data: any;
  res: any = [];
  public stream: any = [];
  activatedroute: any;
  Twitch: any;

  id: any;
  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {


  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
    var options = {
      channel: this.data,
    };
    var player = new this.Twitch.Player("<player div ID>", options);
    player.setVolume(0.5);
  }

}
