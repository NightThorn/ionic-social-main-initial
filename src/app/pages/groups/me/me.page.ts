import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { CreategroupPage } from '../../creategroup/creategroup.page';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit, OnDestroy {
  me: any;
  groups: any = [];
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private authService: AuthenticationService, public modalController: ModalController, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.me = localStorage.getItem("myID");

    this.dataService.getMyGroups(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.groups = res.message;

    });

  }

  goToGroup(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };

    this.router.navigate(['group'], navigationExtras);
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  async createGroup() {

    const modal = await this.modalController.create({
      component: CreategroupPage,
      cssClass: 'modal-container',
      componentProps: {
        'admin': this.me,

      },
    });
    return await modal.present();
  }

}
