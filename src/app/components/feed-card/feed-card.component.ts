import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import moment from 'moment';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
})
export class FeedCardComponent implements OnInit {
  @Input() avatar: string;
  @Input() name: string;
  @Input() date: string;
  @Input() type: string;
  @Input() videosrc: string;
  @Input() picture: string;
  @Input() link: string;
  @Input() likes: number;
  @Input() shares: number;
  @Input() post_id: number;
  @Input() user_id: number;

  @Input() origin: string;

  @Input() text: string;
  @Input() comments: number;
  @Input() separator: boolean;

  imgConfig = {
    spaceBetween: 6,
    slidesPerView: 1,
    centeredSlides: true,
  };
  shared: any;
  offset: number;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    if (this.type === 'shared') {

      this.dataService.getPostDetails(this.origin).subscribe(res => {
        this.shared = res.message;
        for (let i = 0; i < this.shared.length; i++) {
          this.offset = moment().utcOffset();

          this.shared[i]['time'] = moment.utc(this.shared[i]['time']).fromNow();
        }

      });
     }

    
  }

  navigateToDetail(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['post-detail'], navigationExtras);

  }

  user(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/user'], navigationExtras);

  }

  getShared(origin) {
  
  
  }

}
