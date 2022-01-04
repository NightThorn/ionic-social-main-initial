import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { async } from 'rxjs';
import { StoredUser } from 'src/app/models/stored-user';
import { DataService } from 'src/app/services/data.service';
import { AuthenticationService } from "../../services/authentication.service";
import { ModalPage } from '../modal/modal.page';
import { VideoModalPage } from '../video-modal/video-modal.page';
import { XpmodalPage } from '../xpmodal/xpmodal.page';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  storage: any;
  value: string;
  activeStoredUserSubscription$: any;
  me: any;
  points: any;
  wallet: any;
  subscribed: any;
  mod: any;
  staff: any;
  banned: any;
  myXP: any;
  myWallet: any;
  user_package: number;
  boosted_posts: number;
  user: any;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private dataService: DataService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        this.me = storedUser.UserID;
        this.dataService.getUser(this.me).subscribe(res => {
          this.user = res.message;
        });
        this.value = localStorage.getItem("filter");
      }
    });
  }
  gotoShop() {
    this.router.navigate(['shop']);
  }

  following() {
    localStorage.setItem("filter", "following");
    this.value = "following";
  }

  all() {
    localStorage.setItem("filter", "all");
    this.value = "all";


  }
  async logout() {
    await this.authService.destroy();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }


  async openModalPost() {

    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'modal',
      backdropDismiss: false

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
  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

  }




  async openVideoModal(source) {
    const modal = await this.modalController.create({
      component: VideoModalPage,
      backdropDismiss: false,
      cssClass: 'modal',

      componentProps: {
        'source': source
      }
    });
    modal.present();
  }
}

