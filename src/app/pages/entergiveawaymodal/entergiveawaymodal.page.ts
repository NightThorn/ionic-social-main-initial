import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-entergiveawaymodal',
  templateUrl: './entergiveawaymodal.page.html',
  styleUrls: ['./entergiveawaymodal.page.scss'],
})
export class EntergiveawaymodalPage implements OnInit {
  @Input() id: number;
  @Input() user: number;

  postForm: FormGroup;
  owned: any;
  badges: any = [];
  pro: any;
  tickets: any;
  userinfo: any;

  constructor(private modalController: ModalController, private dataService: DataService, private router: Router, public alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {

    this.dataService.getUser(this.user).subscribe(res => {
      this.userinfo = res.message;
      this.tickets = res.message[0]['tickets'];
    });


    this.postForm = this.fb.group({
      user: this.user,

    });

  }

  enter(user) {
    let data = {
      "user_id": user,
    };


    if (this.tickets >= 1) {
      this.http.post('https://ggs.tv/api/v1/giveaways.php?action=enter&id=' + this.id, JSON.stringify(data)).subscribe(res => {
      });

      this.ordered();
    } else {
      this.presentAlert();

    }
  }

  dismissModal() {
    this.modalController.dismiss();

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Oof',
      subHeader: 'Insufficient Funds',
      message: 'Looks like you need some more tickets for this. Go earn XP and buy them! GGs!',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  async ordered() {
    const success = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'Good luck! GGs!',
      buttons: [{
        text: 'OK', handler: () => {
          this.router.navigate(['shop']);
          window.location.reload();
        }
      }]
    });
    await success.present();
    const { role } = await success.onDidDismiss();

  }
}
