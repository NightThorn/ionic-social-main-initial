import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { id } from 'date-fns/locale';
import { async } from 'rxjs';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { BuymodalPage } from '../../buymodal/buymodal.page';

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

  constructor(private dataService: DataService, private router: Router, private authService: AuthenticationService, private modalController: ModalController) { }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:TOKEN", storedUser.Token);
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:ID", storedUser.UserID);
        this.me = storedUser.UserID;
        //check if user pro?
        this.dataService.badgeShopInfo(this.me).subscribe(res => {
          this.info = res.message;
          this.pro = this.info[0]['user_subscribed'];
          console.log("pro??", this.pro);
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
        'price': price
      }
    });
    modal.present();
  }

  goToPro() {

    this.router.navigate(['shop/misc']);

  }
}
