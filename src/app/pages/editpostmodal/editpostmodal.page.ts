import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { GiphyPage } from '../giphy/giphy.page';

@Component({
  selector: 'app-editpostmodal',
  templateUrl: './editpostmodal.page.html',
  styleUrls: ['./editpostmodal.page.scss'],
})
export class EditpostmodalPage implements OnInit {
  @Input() text: string;
  @Input() id: number;

  postForm: FormGroup;
  me: any;
  imgFile: string;
  videoFile: string;
  name = 'angular-mentions';
  gif: string;
  items: any;
  myObj: any;
  names: String[] = [];
  respo: { user_id: any; message: any; time: Date; picture: any; video: any; gif: any; };
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private modalController: ModalController, private profileService: ProfileService, private alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }
  ngOnInit() {
    this.me = localStorage.getItem("myID");

    this.postForm = this.fb.group({
      text: [this.text],

    });
    this.profileService.fetchFriends(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      this.items = res.message;
      this.myObj = Object.values(this.items)[0];
      this.names = [this.myObj["user_name"]];
    });
  }

  post(user, message) {
    let time = new Date(Date.now());
    let data = {
      "post_id": this.id,
      "message": message.text,
      "time": time,

    };
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'response'
    };

    return this.http.post('https://ggs.tv/api/v1/post.php?action=edit', JSON.stringify(data), httpOptions).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
     

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


  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }




}
