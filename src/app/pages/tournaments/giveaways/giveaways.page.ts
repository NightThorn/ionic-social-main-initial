import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { EntergiveawaymodalPage } from '../../entergiveawaymodal/entergiveawaymodal.page';
import { MiscmodalPage } from '../../miscmodal/miscmodal.page';

@Component({
  selector: 'app-giveaways',
  templateUrl: './giveaways.page.html',
  styleUrls: ['./giveaways.page.scss'],
})
export class GiveawaysPage implements OnInit {
  giveaways: any;
  activeStoredUserSubscription$;
  me: any;

  constructor(private dataService: DataService, private router: Router, private authService: AuthenticationService, private modalController: ModalController) { }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        this.me = storedUser.UserID;
        this.dataService.getGiveaways().subscribe(res => {
          this.giveaways = res.message;


        });
      }
      });
  }
  async enter(id) {

    const modal = await this.modalController.create({
      component: EntergiveawaymodalPage,
      backdropDismiss: false,
      cssClass: 'modal',

      componentProps: {
        'id': id,
        'user': this.me,
      }
    });
    modal.present();
  }
}
