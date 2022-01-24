import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { BuymodalPage } from '../../buymodal/buymodal.page';
import { XpmodalPage } from '../../xpmodal/xpmodal.page';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
@Component({
  selector: 'app-load',
  templateUrl: './load.page.html',
  styleUrls: ['./load.page.scss'],
})
export class LoadPage implements OnInit {
  badges: any = [];
  pro: any;
  me: number;
  activeStoredUserSubscription$;
  info: any;
  badgesArray: any;
  xp: any;
  myXP: any;
  myWallet: any;

  constructor(private dataService: DataService, private payPal: PayPal, private router: Router, private authService: AuthenticationService, private modalController: ModalController) { }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        this.me = storedUser.UserID;
        //check if user pro?
        this.dataService.badgeShopInfo(this.me).subscribe(res => {
          this.info = res.message;
          this.pro = this.info[0]['user_subscribed'];
        });

        this.dataService.getBadgeShop().subscribe(res => {
          this.badges = res.message;
          for (let i = 0; i < this.badges.length; i++) {
            if (this.badges[i]['price'] == '0.00' && this.badges[i]['pro_only'] == '0') {
              this.badges[i]['price'] = "Free";

            } else if (this.badges[i]['price'] == '0.00' && this.badges[i]['pro_only'] == '1') {
              this.badges[i]['price'] = "Pro Exclusive";

            }

          }
        });
        this.dataService.getXP(storedUser.UserID).subscribe(res => {
          this.xp = res.message;
          for (let i = 0; i < this.xp.length; i++) {

            this.myXP = this.numFormatter(this.xp[i]['user_points']);
            this.myWallet = this.numFormatter(this.xp[i]['user_wallet_balance']);

          }
        });
      }
    });
  }



  async openXPModal(xp) {

    const modal = await this.modalController.create({
      component: XpmodalPage,
      cssClass: 'modal',
      backdropDismiss: false,
      componentProps: {
        'xp': xp
      }

    });
    modal.present();
  }
  numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }
  paymentAmount: string = '3.33';
  currency: string = 'USD';
  currencyIcon: string = '$';

  payWithPaypal(money) {
    console.log("Pay ????");
    this.payPal.init({
      PayPalEnvironmentProduction: 'ARn5gBIbMkIwBqVxz_BhkZmPsGIIPCkH5RViEnu7Xhn_Hkm2CK2w1IfKqV2JksKKpITgJM5WffLsBwWD',
      PayPalEnvironmentSandbox: 'YOUR_SANDBOX_CLIENT_ID'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(money, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }





}
