import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { id } from 'date-fns/locale';
import { async } from 'rxjs';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { BuymodalPage } from '../../buymodal/buymodal.page';
import { XpmodalPage } from '../../xpmodal/xpmodal.page';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.page.html',
  styleUrls: ['./badges.page.scss'],
})
export class BadgesPage implements OnInit {
  badges: any = [];
  pro: any;
  me: number;
  activeStoredUserSubscription$;
  info: any;
  badgesArray: any;
  xp: any;
  myXP: any;
  myWallet: any;

  constructor(private dataService: DataService, private router: Router, private authService: AuthenticationService, private modalController: ModalController) { }

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


  async buyBadge(id, price) {

    const modal = await this.modalController.create({
      component: BuymodalPage,
      backdropDismiss: false,
      cssClass: 'modal',

      componentProps: {
        'id': id,
        'price': price,
        'wallet': this.myWallet,
      }
    });
    modal.present();
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
  goToPro() {

    this.router.navigate(['shop/misc']);

  }
}
