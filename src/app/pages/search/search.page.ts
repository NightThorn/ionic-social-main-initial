import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  href: string;
  data: any;
  results: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.route.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
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
      this.data = this.href.replace("/search#", "");

    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.data)
      }
    };
    this.router.navigate(['/search/posts'], navigationExtras);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
