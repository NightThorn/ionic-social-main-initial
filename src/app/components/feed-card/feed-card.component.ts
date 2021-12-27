import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import moment from 'moment';
import { InViewportMetadata } from 'ng-in-viewport';
import { htmlEncode, htmlDecode } from 'js-htmlencode';

import { DataService } from 'src/app/services/data.service';
import { HashLocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgxTweetModule } from "ngx-tweet";

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
  activeStoredUserSubscription$;
  me: number;
  reacts: any;
  liked: any;
  reacted: any;
  image: string = "./assets/images/ggsgray.png";
  constructor(private router: Router, private sanitizer: DomSanitizer, private authService: AuthenticationService, private http: HttpClient, private dataService: DataService) {


  }

  ngOnInit() {

    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      this.me = storedUser.UserID;
      console.log(this.me, "meeeeee");




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
          for (let i = 0; i < this.media.length; i++) {
            this.offset = moment().utcOffset();
            if (this.media[i]['source_url'].includes('tube')) {
              this.result = this.media[i]['source_url'].replace('watch?v=', 'embed/');
              this.preurl = htmlDecode(this.result).replace('&feature=youtu.be', '');

              this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.preurl);
              this.external = "youtube";
            }
            else if (this.media[i]['source_url'].includes('twitch')) {
              this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.preurl);

              this.media[i]['time'] = moment.utc(this.media[i]['time']).fromNow();
              this.external = "twitch";

            }
          }

        });
      }
      this.dataService.getLikes(this.post_id).subscribe(res => {
        this.reacted = res.message;
        var i_like = this.reacted.find(message => message.user_id == this.me)
        console.log("i like", i_like);
        if (i_like) {
          this.liked = "1";
          this.image = "./assets/images/ggs.png";
        } else {

          this.liked = "0";
          this.image = "./assets/images/ggsgray.png";

        }
      });
    });
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

  react(id) {
    let data = {
      "post_id": id,
      "user_id": this.me,
    };


    this.http.post('https://ggs.tv/api/v1/post.php?action=react', JSON.stringify(data)).subscribe(res => {
      console.log(res);
      this.likes++;
      this.liked = "1";
      this.image = "./assets/images/ggs.png";




    });




  }

  unreact(id) {

    let data = {
      "post_id": id,
      "user_id": this.me,
    };
    this.http.post('https://ggs.tv/api/v1/post.php?action=unreact', JSON.stringify(data)).subscribe(res => {
      console.log(res);
      this.likes--;
      this.liked = "0";
      this.image = "./assets/images/ggsgray.png";

    });
  }
}



