import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import moment from 'moment';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { ImageModalPage } from '../../image-modal/image-modal.page';
import { ModalPage } from '../../modal/modal.page';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  group: any;
  tabType = 'posts';
  feed: any;
  media: any;
  offset: number;

  constructor(private dataService: DataService, private modalController: ModalController, private router: Router, public loadingController: LoadingController, private auth: AuthenticationService) { }

  ngOnInit() {
    this.dataService.getRandomGroup().subscribe(res => {
      this.group = res.message;
      this.dataService.getGroupFeed(this.group[0]['group_id']).subscribe(res => {
        this.feed = res.message;
        console.log(this.feed);
        for (let i = 0; i < this.feed.length; i++) {
          this.offset = moment().utcOffset();

          this.feed[i]['time'] = moment.utc(this.feed[i]['time']).fromNow();
        }

      });

      this.dataService.getGroupMedia(this.group[0]['group_id']).subscribe(res => {
        this.media = res.message;

      });
    });

  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.dataService.getRandomGroup().subscribe(res => {
      this.group = res.message;

    });
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }



  groupmembers(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/members'], navigationExtras).then(() => {
      window.location.reload();
    });
  }
  async openModalPost() {

    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'modal',
      backdropDismiss: false

    });
    modal.present();
  }
  async openModal(source) {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      cssClass: 'modal-container',
      componentProps: {
        'source': source
      },
    });
    return await modal.present();
  }


  user(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/group/'], navigationExtras);

  }


}
