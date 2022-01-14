import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { CreategroupPage } from '../../creategroup/creategroup.page';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  activeStoredUserSubscription$;
  me: any;
  groups: any = [];

  constructor(private authService: AuthenticationService, public modalController: ModalController, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        this.me = storedUser.UserID;
        this.dataService.getMyGroups(this.me).subscribe(res => {
          this.groups = res.message;

        }

        )
      };

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
