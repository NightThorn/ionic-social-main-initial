import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {
  data: any;
  results: any;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      } else {
        this.data = 'null';

      }
    });
  }
  ngOnInit() {
    this.dataService.getSearch(this.data).subscribe(res => {
      this.results = res.message;
      console.log(this.data);
    });

  }

}
