import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class GiveawaysPage implements OnInit, OnDestroy {
  giveaways: any;
  me: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  xp: any;
  myTickets: any;
  constructor(private dataService: DataService, private router: Router, private authService: AuthenticationService, private modalController: ModalController) { }

  ngOnInit() {
    this.me = localStorage.getItem("myID");
    this.dataService.getXP(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.xp = res.message;

      this.myTickets = this.xp[0]['tickets'];

    });
    this.dataService.getGiveaways().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.giveaways = res.message;


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
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
