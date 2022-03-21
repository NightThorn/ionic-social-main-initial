import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import moment from 'moment';
import { InViewportMetadata } from 'ng-in-viewport';
import { htmlEncode, htmlDecode } from 'js-htmlencode';
import { DataService } from 'src/app/services/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SharemodalPage } from 'src/app/pages/sharemodal/sharemodal.page';
import { AlertController, ModalController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Plugins } from '@capacitor/core';
const { Filesystem } = Plugins;
import { Directory, Encoding } from '@capacitor/filesystem';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EditpostmodalPage } from 'src/app/pages/editpostmodal/editpostmodal.page';


const CACHE_FOLDER = 'CACHED-IMG';
@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
})
export class FeedCardComponent implements OnInit, OnDestroy {
  _picture = '';
  upload = 'https://ggspace.nyc3.cdn.digitaloceanspaces.com/uploads/';
  @Input() avatar: string;
  @Input() name: string;
  @Input() date: string;
  @Input() type: string;
  @Input() videosrc: string;
  @Input() gif: string;
  @Input() link: string;
  @Input() likes: number;
  @Input() ingroup: number;
  @Input() group: number;
  @Input() shares: number;
  @Input() user_subscribed: number;
  @Input() user_mod: number;
  @Input() user_staff: number;
  @Input() user_sponsored: number;
  @Input() user_verified: number;

  @Input() post_id: number;
  @Input() user_id: number;
  @Input() origin: string;
  @Input() text: string;
  @Input() comments: number;
  @Input() separator: boolean;
  @Input() boosted: number;
  @Input() feeling: string;
  @Input() value: string;
  @Input() tag: string;
  @Input() grinding: number;
  @Input() colored: any;
  groupID: any;
  @Input()
  set picture(pic) {
    if (pic != null) {
      const imageName = pic.split('/').pop();

      const fileType = imageName.split('.').pop();
      Filesystem.readFile({
        directory: Directory.Cache,
        path: `${CACHE_FOLDER}/${imageName}`
      }).then(readFile => {
        this._picture = `data:image/${fileType};base64,${readFile.data}`;
      }).catch(async e => {
        await this.storeImage(pic, imageName);
        Filesystem.readFile({
          directory: Directory.Cache,
          path: `${CACHE_FOLDER}/${imageName}`
        }).then(readFile => {

          this._picture = `data:image/${fileType};base64,${readFile.data}`;

        })
      });
    }
  };
  async storeImage(url, path) {
    const response = await fetch('https://ggspace.nyc3.cdn.digitaloceanspaces.com/uploads/${url}');
    // convert to a Blob
    const blob = await response.blob();
    // convert to base64 data, which the Filesystem plugin requires
    const base64Data = await this.convertBlobToBase64(blob) as string;

    const savedFile = await Filesystem.writeFile({
      path: `${CACHE_FOLDER}/${path}`,
      data: base64Data,
      directory: Directory.Cache
    });
    return savedFile;
  }
  // helper function
  convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {

      const reader = new FileReader;
      reader.onload = () => {

        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }


  imgConfig = {
    spaceBetween: 6,
    slidesPerView: 1,
    centeredSlides: true,
  };
  urls: SafeResourceUrl;
  private onDestroy$: Subject<void> = new Subject<void>();

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
  me: any;
  groupname: any;
  reacts: any;
  liked: any;
  points: number;
  wallet: number;
  subscribed: number;
  mod: number;
  staff: number;
  banned: number;
  reacted: any;
  image: string = "./assets/images/ggsgray.png";
  groups: any;
  background: any;
  coloredpost: any;
  coloredtext: any;
  constructor(private router: Router, private alertCtrl: AlertController, private modalController: ModalController, private sanitizer: DomSanitizer, private authService: AuthenticationService, private http: HttpClient, private dataService: DataService) {


  }


  ngOnInit() {

    this.me = localStorage.getItem("myID");


    if (this.colored > 0) {
      this.dataService.getColored(this.colored).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.background = res.message;
        this.coloredpost = this.background[0]['background_image'];
        this.coloredtext = this.background[0]['text_color'];
      });
    }
    if (this.ingroup > 0) {
      this.dataService.getgroupname(this.group).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.groupname = res.message[0]['group_title'];
      });
    }
    if (this.text != null) {
      if (this.text.includes('#')) {
        this.decodedtext = htmlDecode(this.text)
        this.text = this.hashtag(this.decodedtext);

      }
      if (this.text.includes('@')) {
        this.decodedtext = htmlDecode(this.text)
        this.text = this.at(this.decodedtext);

      }
      if (this.text.includes('https')) {
        this.decodedtext = htmlDecode(this.text)
        this.text = this.href(this.decodedtext);

      }
    }
    if (this.type === 'shared') {

      this.dataService.getPostDetails(this.origin).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.shared = res.message;

        for (let i = 0; i < this.shared.length; i++) {
          this.offset = moment().utcOffset();
          if (this.shared[i]['in_group'] > 0) {
            this.dataService.getgroupname(this.group).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
              this.groupname = res.message;
            });
          }
          this.shared[i]['time'] = moment.utc(this.shared[i]['time']).fromNow();
        }

      });
      this.dataService.getMediaPost(this.origin).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.sharedmedia = res.message;
        for (let i = 0; i < this.sharedmedia.length; i++) {
          this.offset = moment().utcOffset();
          if (this.sharedmedia[i]['source_url'].includes('tube')) {
            this.result = this.sharedmedia[i]['source_url'].replace('watch?v=', 'embed/');
            this.preurl = htmlDecode(this.result).replace('&feature=youtu.be', '?enablejsapi=1');

            this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.preurl);
            this.external = "youtube";
          } else if (this.sharedmedia[i]['source_url'].includes('twitch')) {
            this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.preurl);

            this.sharedmedia[i]['time'] = moment.utc(this.sharedmedia[i]['time']).fromNow();
            this.external = "twitch";

          }
          else if (this.sharedmedia[i]['source_url'].includes('giphy')) {
            this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.preurl);

            this.sharedmedia[i]['time'] = moment.utc(this.sharedmedia[i]['time']).fromNow();
            this.external = "giphy";

          }
        }

      });

    }

    if (this.type === 'media') {

      this.dataService.getMediaPost(this.post_id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.media = res.message;
        for (let i = 0; i < this.media.length; i++) {
          this.offset = moment().utcOffset();
          if (this.media[i]['source_url'].includes('tube')) {
            this.result = this.media[i]['source_url'].replace('watch?v=', 'embed/');
            this.preurl = htmlDecode(this.result).replace('&feature=youtu.be', '?enablejsapi=1');

            this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.preurl);
            this.external = "youtube";
          }
          else if (this.media[i]['source_url'].includes('twitch')) {
            this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.preurl);

            this.media[i]['time'] = moment.utc(this.media[i]['time']).fromNow();
            this.external = "twitch";

          }
          else if (this.media[i]['source_url'].includes('giphy')) {
            this.urls = this.sanitizer.bypassSecurityTrustResourceUrl(this.preurl);

            this.media[i]['time'] = moment.utc(this.media[i]['time']).fromNow();
            this.external = "giphy";

          }
        }

      });
    }
    this.dataService.getLikes(this.post_id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.reacted = res.message;
      var i_like = this.reacted.find(message => message.user_id == this.me)
      if (i_like) {
        this.liked = "1";
        this.image = "./assets/images/ggs.png";
      } else {

        this.liked = "0";
        this.image = "./assets/images/ggsgray.png";

      }
    });
  }



  onIntersection($event) {
    const { [InViewportMetadata]: { entry }, target } = $event;
    const ratio = entry.intersectionRatio;
    const vid = target;

    ratio >= 0.65 ? vid.play() : vid.pause();
  }
  navigateToDetail(id) {
    const hapticsVibrate = async () => {
      await Haptics.vibrate();
    };
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
  href(text) {
    var repl = text.replace(/(https?:\/\/.*?)[.!?;,]?(\s+|"|$)/, '<a href="$1">$1</a>');

    return repl;
  }
  at(text) {
    var repl = text.replace(/@(\w+)/g, '<a href="mentionuser?username=$1">$1</a>');

    return repl;
  }
  user(id) {

    this.router.navigate(['/user/' + id]);
  }
  react(id) {
    let data = {
      "post_id": id,
      "user_id": this.me,
      "node_type": 'post',
    };
    const hapticsVibrate = async () => {
      await Haptics.vibrate();
    };
    this.likes++;
    this.liked = "1";
    this.image = "./assets/images/ggs.png";
    this.http.post('https://ggs.tv/api/v1/post.php?action=react', JSON.stringify(data)).subscribe(res => {

    });
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  async share(id) {
    const modal = await this.modalController.create({
      component: SharemodalPage,
      cssClass: 'modal',
      backdropDismiss: false,
      componentProps: {
        'id': id,

      }

    });
    modal.present();
  }

  async edit(id, text) {
    const modal = await this.modalController.create({
      component: EditpostmodalPage,
      cssClass: 'modal',
      backdropDismiss: false,
      componentProps: {
        'id': id,
        'text': text

      }

    });
    modal.present();
  }
  goToGroup(id) {

    this.router.navigate(['/group/' + id]);
  }

  unreact(id) {

    let data = {
      "post_id": id,
      "user_id": this.me,
    };
    this.likes--;
    this.liked = "0";
    this.image = "./assets/images/ggsgray.png";
    this.http.post('https://ggs.tv/api/v1/post.php?action=unreact', JSON.stringify(data)).subscribe(res => {


    });
  }

  getTagGroup(tag) {


    this.dataService.getGroupFromTag(tag).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.groups = res.message;
      this.groupID = this.groups[0]['group_id'];



      this.router.navigate(['/group/' + this.groupID]);
    });

  }

  async delete(id) {

    const alert = await this.alertCtrl.create({

      header: 'Delete this post?',
      message: 'Are you sure you would like to delete this post?',

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Delete',
          handler: (test) => {
            let data = {
              "post_id": id,
              "user_id": this.me,
            };
            this.http.post('https://ggs.tv/api/v1/post.php?action=delete', JSON.stringify(data))
              .pipe(takeUntil(this.onDestroy$)).subscribe(async () => {
                let alert = await this.alertCtrl.create({
                  header: 'Success',
                  message: 'You have deleted this post.',
                  buttons: ['OK']
                });
                alert.present();
              });
          }
        }
      ]
    });
    await alert.present();
  }


  async boost(id) {

    const alert = await this.alertCtrl.create({

      header: 'Use a boost on this post?',
      message: 'Are you sure you would like to BOOST this post?',

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Boost!',
          handler: (test) => {
            let data = {
              "post_id": id,
              "user_id": this.me,
            };
            this.http.post('https://ggs.tv/api/v1/post.php?action=boost', JSON.stringify(data))
              .pipe(takeUntil(this.onDestroy$)).subscribe(async () => {
                let alert = await this.alertCtrl.create({
                  header: 'Success',
                  message: 'You have boosted this post. A notification has been sent to the author!',
                  buttons: ['OK']
                });
                alert.present();
              });
          }
        }
      ]
    });
    await alert.present();
  }
  async deboost(id) {

    const alert = await this.alertCtrl.create({

      header: 'Deboost this post?',
      message: 'Are you sure you would like to deboost this post?',

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'deboost',
          handler: (test) => {
            let data = {
              "post_id": id,
              "user_id": this.me,
            };
            this.http.post('https://ggs.tv/api/v1/post.php?action=deboost', JSON.stringify(data))
              .pipe(takeUntil(this.onDestroy$)).subscribe(async () => {
                let alert = await this.alertCtrl.create({
                  header: 'Success',
                  message: 'You have deboosted this post.',
                  buttons: ['OK']
                });
                alert.present();
              });
          }
        }
      ]
    });
    await alert.present();
  }
  async report(id) {

    const alert = await this.alertCtrl.create({

      header: 'Report post?',
      message: 'Are you sure you would like to report this post?',

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: (test) => {
            let data = {
              "post_id": id,
              "user_id": this.me,
            };
            this.http.post('https://ggs.tv/api/v1/post.php?action=report', JSON.stringify(data))
              .pipe(takeUntil(this.onDestroy$)).subscribe(async () => {
                let alert = await this.alertCtrl.create({
                  header: 'Success',
                  message: 'Thank you for reporting this content. Our staff will review it.',
                  buttons: ['OK']
                });
                alert.present();
              });
          }
        }
      ]
    });
    await alert.present();
  }
}



