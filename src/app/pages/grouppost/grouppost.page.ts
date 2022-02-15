import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GiphyPage } from '../giphy/giphy.page';
import { OverlayEventDetail } from '@ionic/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-grouppost',
  templateUrl: './grouppost.page.html',
  styleUrls: ['./grouppost.page.scss'],
})
export class GrouppostPage implements OnInit {
  postForm: FormGroup;
  me: any;
  imgFile: string;
  videoFile: string;
  gif: string;
  group: number;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private modalController: ModalController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.me = localStorage.getItem("myID");

    this.postForm = this.fb.group({
      text: [null],
      picture: [null],
      video: [null],
      gif: [null],

    });
  }

  post(user, message) {
    let time = new Date(Date.now());
    let data = {
      "user_id": user,
      "message": message.text,
      "time": time,
      "picture": message.picture,
      "video": message.video,
      "group": this.group,

      "gif": message.gif


    };
    this.http.post('https://ggs.tv/api/v1/post.php?action=group', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });

    this.closeModal();
  }
  closeModal() {
    this.modalController.dismiss();

  }
  async giphy(id) {
    const modal = await this.modalController.create({
      component: GiphyPage,
      backdropDismiss: false,
      cssClass: 'modal',

      componentProps: {
        'id': id
      }
    });
    modal.present();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  onFileChange(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        var elem = document.createElement("img");
        elem.setAttribute("src", this.imgFile);
        elem.setAttribute("height", "200");
        elem.setAttribute("width", "100%");
        elem.setAttribute("alt", "IMG");
        this.postForm.patchValue({
          picture: reader.result
        });
        document.getElementById("preview").appendChild(elem);
        document.getElementById("imageid").style.border = "thick solid lime";
        document.getElementById("gifid").style.border = "none";
        document.getElementById("videoid").style.border = "none";


      };
    }
  }

  onVideo(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.videoFile = reader.result as string;
        var elem = document.createElement("video");
        elem.setAttribute("src", this.videoFile);
        elem.setAttribute("height", "200");
        elem.setAttribute("width", "100%");
        elem.setAttribute("alt", "video");
        elem.autoplay = true;
        elem.controls = true;
        elem.muted = true;



        this.postForm.patchValue({
          video: reader.result
        });
        document.getElementById("preview").appendChild(elem);
        document.getElementById("videoid").style.border = "thick solid lime";
        document.getElementById("imageid").style.border = "none";
        document.getElementById("gifid").style.border = "none";

      };
    }
  }
  async onGif(e) {
    const modal = await this.modalController.create({
      component: GiphyPage,
      backdropDismiss: false,
      cssClass: 'modal'
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        this.gif = detail.data;

        var elem = document.createElement("img");
        elem.setAttribute("src", this.gif);
        elem.setAttribute("height", "200");
        elem.setAttribute("width", "100%");
        elem.setAttribute("alt", "IMG");

        document.getElementById("preview").appendChild(elem);
        document.getElementById("gifid").style.border = "thick solid lime";
        document.getElementById("imageid").style.border = "none";
        document.getElementById("videoid").style.border = "none";

        this.postForm.patchValue({
          gif: this.gif
        });
      }
    });
    await modal.present();

  };
}
