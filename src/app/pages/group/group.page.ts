import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  data: any;
  tabType = 'posts';

  group: any;

  constructor(private activeRoute: ActivatedRoute, private modalController: ModalController,
private dataService: DataService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
        console.log("uhhhhh huh", this.data);
      }
    });

    this.dataService.getGroup(this.data).subscribe(res => {
      this.group = res.message;
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
}
