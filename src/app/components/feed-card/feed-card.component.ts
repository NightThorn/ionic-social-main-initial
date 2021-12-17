import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import moment from 'moment';
import { InViewportMetadata } from 'ng-in-viewport';
import { htmlEncode, htmlDecode } from 'js-htmlencode';

import { DataService } from 'src/app/services/data.service';
import { HashLocationStrategy } from '@angular/common';

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
  urls: SafeResourceUrl;

  shared: any;
  offset: number;
  media: any;
  result: any;
  embed: SafeResourceUrl;
  results: any;
  preurl: string;
  external: string;
  decodedtext: any;
  sharedmedia: any;

  constructor(private router: Router, private sanitizer: DomSanitizer, private dataService: DataService) { }

  ngOnInit() {
    if (this.text.includes('#')) {
      this.decodedtext = htmlDecode(this.text)
      this.text = this.hashtag(this.decodedtext);

    }
    if (this.type === 'shared') {

      this.dataService.getPostDetails(this.origin).subscribe(res => {
        this.shared = res.message;
        for (let i = 0; i < this.shared.length; i++) {
          this.offset = moment().utcOffset();

          this.shared[i]['time'] = moment.utc(this.shared[i]['time']).fromNow();
        }

      });
      this.dataService.getMediaPost(this.origin).subscribe(res => {
        this.sharedmedia = res.message;
        for (let i = 0; i < this.sharedmedia.length; i++) {
          this.offset = moment().utcOffset();
          if (this.sharedmedia[i]['source_url'].includes('tube')) {
            this.result = this.sharedmedia[i]['source_url'].replace('watch?v=', 'embed/');
            this.preurl = htmlDecode(this.result).replace('&feature=youtu.be', '');

            this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.preurl);
            console.log("test?", this.urls);
            this.external = "youtube";
          } else if (this.sharedmedia[i]['source_url'].includes('twitch')) {
            this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.preurl);

            this.sharedmedia[i]['time'] = moment.utc(this.sharedmedia[i]['time']).fromNow();
            this.external = "twitch";

          }
        }

      });

    }

    if (this.type === 'media') {

      this.dataService.getMediaPost(this.post_id).subscribe(res => {
        this.media = res.message;
        console.log("asdf", this.media);
        for (let i = 0; i < this.media.length; i++) {
          this.offset = moment().utcOffset();
          if (this.media[i]['source_url'].includes('tube')) {
            this.result = this.media[i]['source_url'].replace('watch?v=', 'embed/');
            this.preurl = htmlDecode(this.result).replace('&feature=youtu.be', '');

            this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.preurl);
            console.log("test?", this.urls);
            this.external = "youtube";
          } else if (this.media[i]['source_url'].includes('twitch')) {
            this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.preurl);

            this.media[i]['time'] = moment.utc(this.media[i]['time']).fromNow();
            this.external = "twitch";

          }
        }

      });
    }

  }
  onIntersection($event) {
    const { [InViewportMetadata]: { entry }, target } = $event;
    const ratio = entry.intersectionRatio;
    const vid = target;

    ratio >= 0.65 ? vid.play() : vid.pause();
  }
  navigateToDetail(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['post-detail'], navigationExtras);

  }
  hashtag(text) {
    var repl = text.replace(/#(\w+)/g, '<a href="search/#$1">#$1</a>');

    return repl;
  }
  user(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/user'], navigationExtras);

  }




}
