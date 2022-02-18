import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-buymodal',
  templateUrl: './buymodal.page.html',
  styleUrls: ['./buymodal.page.scss'],
})
export class BuymodalPage implements OnInit, OnDestroy {
  @Input() id: number;
  @Input() price: number;
  @Input() wallet: number;

  postForm: FormGroup;
  me: any;
  owned: any;
  badges: any = [];
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private modalController: ModalController, private dataService: DataService, private router: Router, public alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {

    this.me = localStorage.getItem("myID");
    this.dataService.fetchBadges(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.badges = res.message;
      var target = this.badges.find(message => message.badge === this.id)
      if (target) {
        this.owned = "1";
      } else {

        this.owned = "0";
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
      this.http.post('https://ggs.tv/api/v1/buybadge.php?badge=' + this.id, JSON.stringify(data)).subscribe(res => {
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


  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
