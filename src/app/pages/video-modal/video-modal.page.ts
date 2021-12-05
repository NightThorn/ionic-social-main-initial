import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.page.html',
  styleUrls: ['./video-modal.page.scss'],
})
export class VideoModalPage implements OnInit {
  @Input() source: string;
  @ViewChild('video') myVideo: ElementRef;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
   
  }
  videoSet() {
    if (this.myVideo.nativeElement.paused) {
      this.myVideo.nativeElement.play();
    } else {

      this.myVideo.nativeElement.pause();

    }
  }
  async dismissModal() {
    await this.modalController.dismiss(close);
  }
}
