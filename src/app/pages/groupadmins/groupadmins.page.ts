import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { AddadminPage } from '../addadmin/addadmin.page';
import { OverlayEventDetail } from '@ionic/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-groupadmins',
  templateUrl: './groupadmins.page.html',
  styleUrls: ['./groupadmins.page.scss'],
})
export class GroupadminsPage implements OnInit {
  me: number;
  @Input() group_id: number;

  res: any = [];
  private onDestroy$: Subject<void> = new Subject<void>();
  admins: any;



  constructor(private modalController: ModalController, private router: Router, private dataService: DataService, private alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {

    this.dataService.getGroupAdmins(this.group_id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.admins = res.message;
    });

  }



  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  remove(user) {
    let data = {
      "user_id": user
    };
    this.http.post('https://ggs.tv/api/v1/groupadmins.php?action=remove&group=' + this.group_id, JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      this.closeModal();
    });

  }
  closeModal() {
    this.modalController.dismiss();

  }

  user(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['user'], navigationExtras)
    this.closeModal();

  }
  async add(id) {

    const modal = await this.modalController.create({
      component: AddadminPage,
      cssClass: 'modal',
      backdropDismiss: false,
      componentProps: {
        'group_id': id
      },

    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      this.dataService.getGroupAdmins(this.group_id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
        this.admins = res.message;
      });
    });
    modal.present();
  }
}
