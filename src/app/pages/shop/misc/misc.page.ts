import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { BuymodalPage } from '../../buymodal/buymodal.page';
import { MiscmodalPage } from '../../miscmodal/miscmodal.page';
import { TicketmodalPage } from '../../ticketmodal/ticketmodal.page';
import { XpmodalPage } from '../../xpmodal/xpmodal.page';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.page.html',
  styleUrls: ['./misc.page.scss'],
})
export class MiscPage implements OnInit {

  me: any;
  info: any;
  pro: any;
  badges: any;
  xp: any;
  myXP: any;
  myWallet: any;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private dataService: DataService, private router: Router, private authService: AuthenticationService, private modalController: ModalController) { }

  ngOnInit() {
    this.me = localStorage.getItem("myID");

    this.dataService.getXP(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.xp = res.message;
      for (let i = 0; i < this.xp.length; i++) {

        this.myXP = this.numFormatter(this.xp[i]['user_points']);
        this.myWallet = this.numFormatter(this.xp[i]['user_wallet_balance']);

      }
    });




  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  async buyPro(id, price) {

    const modal = await this.modalController.create({
      component: MiscmodalPage,
      backdropDismiss: false,
      cssClass: 'modal',

      componentProps: {
        'id': id,
        'user': this.me,
        'price': price,
        'wallet': this.myWallet,


      }
    });
    modal.present();
  }
  async buyTicket(id, price) {

    const modal = await this.modalController.create({
      component: TicketmodalPage,
      backdropDismiss: false,
      cssClass: 'modal',

      componentProps: {
        'id': id,
        'user': this.me,
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
}
