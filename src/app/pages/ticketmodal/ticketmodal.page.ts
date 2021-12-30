import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ticketmodal',
  templateUrl: './ticketmodal.page.html',
  styleUrls: ['./ticketmodal.page.scss'],
})
export class TicketmodalPage implements OnInit {

  @Input() id: number;
  @Input() price: number;
  @Input() wallet: number;

  postForm: FormGroup;
  activeStoredUserSubscription$;
  me: number;
  owned: any;
  badges: any = [];
  user: any;
  pro: any;

  constructor(private modalController: ModalController, private dataService: DataService, private router: Router, public alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
       
        this.me = storedUser.UserID;
       
      }
    });


    this.postForm = this.fb.group({
      user: this.me,

    });

  }

  buy(user) {
    let data = {
      "user_id": user,
      "price": this.price
    };
    let price = this.price;
    let wallet = this.wallet;


    if (price < wallet) {
      this.http.post('https://ggs.tv/api/v1/miscshop.php?item=ticket', JSON.stringify(data)).subscribe(res => {
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
      message: 'Looks like you need some more coins for this. Go earn them or refill your wallet! GGs!',
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
