import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-miscmodal',
  templateUrl: './miscmodal.page.html',
  styleUrls: ['./miscmodal.page.scss'],
})
export class MiscmodalPage implements OnInit, OnDestroy {

  @Input() id: number;
  @Input() price: number;
  @Input() wallet: number;

  postForm: FormGroup;
  me: any;
  owned: any;
  badges: any = [];
  user: any;
  pro: any;

  constructor(private modalController: ModalController, private dataService: DataService, private router: Router, public alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.me = localStorage.getItem("myID");

    this.dataService.getUser(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.user = res.message;
      var target = this.user.find(message => message.user_subscribed == 1)
      if (target) {
        this.pro = "1";
      } else {

        this.pro = "0";
      }

    });



    this.postForm = this.fb.group({
      user: this.me,

    });

  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  buy(user) {
    let data = {
      "user_id": user,
      "price": this.price
    };
    let price = this.price;
    let wallet = this.wallet;


    if (price < wallet) {
      this.http.post('https://ggs.tv/api/v1/miscshop.php?item=' + this.id, JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
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
      message: 'Enjoy your new badge! GGs!',
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
  private onDestroy$: Subject<void> = new Subject<void>();
}