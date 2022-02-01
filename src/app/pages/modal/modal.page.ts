import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GiphyPage } from '../giphy/giphy.page';
import { OverlayEventDetail } from '@ionic/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  postForm: FormGroup;
  activeStoredUserSubscription$;
  me: number;
  imgFile: string;
  videoFile: string;
  name = 'angular-mentions';
  gif: string;
  items: any;
  myObj: any;
  names: String[] = [];
  respo: { user_id: any; message: any; time: Date; picture: any; video: any; gif: any; };

  constructor(private modalController: ModalController, private profileService: ProfileService, private alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {

        this.me = storedUser.UserID;

      }
    })
    this.postForm = this.fb.group({
      text: [null],
      picture: [null],
      video: [null],
      gif: [null],

    });
    this.profileService.fetchFriends(this.me).subscribe(res => {

      this.items = res.message;
      this.myObj = Object.values(this.items)[0];
      this.names = [this.myObj["user_name"]];
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
      "gif": message.gif


    };
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    };

    return this.http.post('https://ggs.tv/api/v1/post.php?action=post', JSON.stringify(data), httpOptions).subscribe(res => {
      console.log(res);
      console.log(res['status']);

      if (res['status'] = 200) {
        this.presentAlert();
        this.closeModal();
      } else {

        this.presentError();
        this.closeModal();

      }


    });

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Post Successful',
      message: 'You have successfully posted!',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  async presentError() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oof',
      subHeader: 'Post Unsuccessful',
      message: 'Something went wrong, please try again!',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
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
        document.getElementById("videoid").style.borderRadius = "10px";

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