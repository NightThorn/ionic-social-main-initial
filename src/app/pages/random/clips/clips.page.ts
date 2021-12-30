import { Component, OnInit } from '@angular/core';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { GestureController, LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.page.html',
  styleUrls: ['./clips.page.scss'],
})
export class ClipsPage implements OnInit {
  clip: any;
  @ViewChild('video') myVideo: ElementRef;
  post_id: any;

  constructor(private dataService: DataService, private router: Router, public loadingController: LoadingController, private auth: AuthenticationService, private gestureCtrl: GestureController) { }

  async ngOnInit() {



    this.dataService.getRandomClip().subscribe(res => {
      this.clip = res.message;
      this.post_id = res.message['0']['post_id'];

      window.onbeforeunload = () => this.ionViewWillLeave();
    })
  }

  doRefresh(event) {
    this.dataService.getRandomClip().subscribe(res => {
      this.clip = res.message;

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
}
