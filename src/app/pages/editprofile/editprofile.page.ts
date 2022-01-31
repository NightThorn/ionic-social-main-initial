import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  imgFile: string;

  postForm: FormGroup;
  activeStoredUserSubscription$;
  me: number;
  private file: File;


  constructor(private modalController: ModalController, private alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      

    });
    this.postForm = this.fb.group({
      cover: [''],
      picture: [''],


    });
  }

  post(message) {
    let data = {
      "picture": message.picture,
      "cover": message.cover,
      "user": this.me



    };
    this.http.post('https://ggs.tv/api/v1/edituser.php?action=profile', JSON.stringify(data)).subscribe(res => {
      this.presentAlert();

      this.closeModal();
      window.location.reload();

    });

  }
  closeModal() {
    this.modalController.dismiss();

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Profile Updated',
      message: 'Settings have been saved!',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  onFileChange(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.postForm.patchValue({
          picture: reader.result
        });

      };
    }
  }
  // for video upload  https://www.codegrepper.com/code-examples/html/input+type+file+accept+only+video

  onCoverChange(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.postForm.patchValue({
          cover: reader.result
        });

      };
    }
  }


}
