import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-buymerchmodal',
  templateUrl: './buymerchmodal.page.html',
  styleUrls: ['./buymerchmodal.page.scss'],
})
export class BuymerchmodalPage implements OnInit {
  @Input() id: number;
  @Input() wallet: number;

  postForm: FormGroup;
  me: any;
  merchItem: any;
  noMoney: any;
  constructor(private modalController: ModalController, private router: Router, public alertController: AlertController, private dataService: DataService, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
     
    this.me = localStorage.getItem("myID");


      this.dataService.getMerchItem(this.id).subscribe(res => {
        this.merchItem = res.message;
      });
    this.postForm = this.fb.group({
      name: [null],
      street: [null],
      city: [null],
      state: [null],
      zip: [null],
      size: [null],
    });
  }

  post(me, value) {
    let data = {
      "user_id": me,
      "price": this.merchItem[0]['price'],
      "item": this.merchItem[0]['id'],
      "name": value.name,
      "street": value.street,
      "city": value.city,
      "state": value.state,
      "zip": value.zip,
      "size": value.size,

    };
    if (data.price <= this.wallet) {
      this.http.post('https://ggs.tv/api/v1/buymerch.php?action=buy&item=' + data.item, JSON.stringify(data)).subscribe(res => {
      });

      this.ordered();

      


    } else {
      this.presentAlert();


    }
  }
  closeModal() {
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
      message: 'Order placed. We will reach out and provide you with your shipping information. GGs!',
      buttons: [{
        text: 'OK', handler: () => {
          this.router.navigate(['shop/merch']);
          window.location.reload();
        }
      }]
    });
    await success.present();
    const { role } = await success.onDidDismiss();

  }
}
