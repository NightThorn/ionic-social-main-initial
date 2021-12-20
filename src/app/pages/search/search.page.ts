import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  href: string;
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
    if (this.data = 'null') {
      this.href = this.router.url;
      var repl = this.href.replace("/search#", "");
      let navigationExtras: NavigationExtras = {
        queryParams: {
          special: JSON.stringify(repl)
        }
      };
      this.router.navigate(['/search/posts'], navigationExtras);
    }
  }

}
