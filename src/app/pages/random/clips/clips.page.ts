import { Component, OnInit } from '@angular/core';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-clips',
  templateUrl: './clips.page.html',
  styleUrls: ['./clips.page.scss'],
})
export class ClipsPage implements OnInit {
  clip: any;

  constructor(private videoPlayer: VideoPlayer, private dataService: DataService) { }

  ngOnInit() {

    this.dataService.getRandomClip().subscribe(res => {
      this.clip = res.message;

      console.log(this.clip);
    });
    this.videoPlayer.play('https://ggspace.nyc3.cdn.digitaloceanspaces.com/uploads/').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }

}
