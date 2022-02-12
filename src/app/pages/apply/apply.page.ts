import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.page.html',
  styleUrls: ['./apply.page.scss'],
})
export class ApplyPage implements OnInit {
  postForm: FormGroup;
  me: any;
  @Input() group_id: number;




  constructor(private modalController: ModalController, private alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {

    this.me = localStorage.getItem("myID");




    this.postForm = this.fb.group({
      fname: '',
      lname: '',
      email: '',
      bio: '',
      stats: '',

    });
  }

  post(message) {
    let data = {
      "userid": this.me,
      "fname": message.fname,
      "lname": message.lname,
      "email": message.email,
      "bio": message.bio,
      "stats": message.stats,
      "group_id": this.group_id,
    };
    this.http.post('https://ggs.tv/api/v1/group.php?action=apply', JSON.stringify(data)).subscribe(res => {
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
      header: 'Application Submitted',
      message: 'The group owner will look over your application',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

}