import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { BuymerchmodalPage } from '../../buymerchmodal/buymerchmodal.page';
import { XpmodalPage } from '../../xpmodal/xpmodal.page';

@Component({
  selector: 'app-merch',
  templateUrl: './merch.page.html',
  styleUrls: ['./merch.page.scss'],
})
export class MerchPage implements OnInit {
  activeStoredUserSubscription$;
  me: number;
  merch: any = [];
  xp: any;
  myXP: any;
  myWallet: number;
  noMoney: any;

  constructor(private authService: AuthenticationService, private modalController: ModalController, private router: Router, private dataService: DataService) { }

  ngOnInit() {

    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        this.me = storedUser.UserID;
        console.log(this.me);
        this.dataService.getXP(storedUser.UserID).subscribe(res => {
          this.xp = res.message;
          for (let i = 0; i < this.xp.length; i++) {

            this.myXP = this.numFormatter(this.xp[i]['user_points']);
            this.myWallet = this.numFormatter(this.xp[i]['user_wallet_balance']);

            console.log("xp", this.myXP);
          }
        });
        this.dataService.getMerch().subscribe(res => {
          this.merch = res.message;



        });
      };

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
  async buyMerch(id, wallet) {
    console.log("$$", this.myWallet);

    const modal = await this.modalController.create({
      component: BuymerchmodalPage,
      cssClass: 'modal',
      backdropDismiss: false,
      componentProps: {
        'id': id,
        'wallet': wallet
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
}
