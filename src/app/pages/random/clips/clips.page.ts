import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { GestureController, LoadingController, ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavigationExtras, Router } from '@angular/router';
import { Haptics } from '@capacitor/haptics';
import { StoredUser } from 'src/app/models/stored-user';
import { SharemodalPage } from '../../sharemodal/sharemodal.page';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.page.html',
  styleUrls: ['./clips.page.scss'],
})
export class ClipsPage implements OnInit, OnDestroy {
  clip: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  @ViewChild('video') myVideo: ElementRef;
  post_id: any;
  me: any;
  likes: number;
  liked: any;
  shares: number;
  comments: number;
  image: string = "./assets/images/ggsgray.png";
  offset: number;

  constructor(private dataService: DataService, private http: HttpClient, private modalController: ModalController, private authService: AuthenticationService, private router: Router, public loadingController: LoadingController, private auth: AuthenticationService, private gestureCtrl: GestureController) { }

  async ngOnInit() {
    this.me = localStorage.getItem("myID");

    this.dataService.getRandomClip().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.clip = res.message;
      this.post_id = res.message['0']['post_id'];
      this.offset = moment().utcOffset();

      this.clip[0]['time'] = moment.utc(this.clip[0]['time']).fromNow();


      window.onbeforeunload = () => this.ionViewWillLeave();
    })
  }

  doRefresh(event) {
    this.dataService.getRandomClip().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.clip = res.message;
      this.post_id = res.message['0']['post_id'];
      this.offset = moment().utcOffset();

      this.clip[0]['time'] = moment.utc(this.clip[0]['time']).fromNow();

    });
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  presentToast(msg: string) {
    throw new Error('Method not implemented.');
  }

  ionViewWillLeave() {

    this.myVideo.nativeElement.pause();


  }
  videoSet() {
    if (this.myVideo.nativeElement.paused) {
      this.myVideo.nativeElement.play();
    } else {

      this.myVideo.nativeElement.pause();

    }


  }
  navigateToDetail(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.myVideo.nativeElement.pause();

    this.router.navigate(['post-detail'], navigationExtras);

  }
  user(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.myVideo.nativeElement.pause();

    this.router.navigate(['/user/'], navigationExtras);

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
    this.http.post('https://ggs.tv/api/v1/post.php?action=react', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

    });
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
  deboost(id) {
    let data = {
      "post_id": id,
      "user_id": this.me,
    };
    this.http.post('https://ggs.tv/api/v1/post.php?action=deboost', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });
  }
  boost(id) {
    let data = {
      "post_id": id,
      "user_id": this.me,
    };
    this.http.post('https://ggs.tv/api/v1/post.php?action=boost', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });
  }
  report(id) {
    let data = {
      "post_id": id,
      "user_id": this.me,
    };
    this.http.post('https://ggs.tv/api/v1/post.php?action=report', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  unreact(id) {

    let data = {
      "post_id": id,
      "user_id": this.me,
    };
    this.likes--;
    this.liked = "0";
    this.image = "./assets/images/ggsgray.png";
    this.http.post('https://ggs.tv/api/v1/post.php?action=unreact', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {


    });
  }

}
