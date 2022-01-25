import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-grind',
  templateUrl: './grind.page.html',
  styleUrls: ['./grind.page.scss'],
})
export class GrindPage implements OnInit {
  @Input() id: number;
  friends: any;
  public dataL: Array<object> = [];
  public groups: any = [];
  activatedroute: any;
  data: any;
  public searchTerm: string = "";
  public items: any;
  private topLimit: number = 15;
  public dataList: any = [];
  navCtrl: any;

  constructor(private modalController: ModalController, private router: Router, private dataService: DataService, private alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }
  ngOnInit() {


    this.dataService.getAllGroups(this.id).subscribe(res => {
      this.groups = res.message;
      this.dataList = this.groups.slice(0, this.topLimit);

    });
    this.setFilteredItems();

  }

  loadData(event) {
    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.groups.slice(0, this.topLimit);
      event.target.complete();
      if (this.dataList.length == this.dataL.length)
        event.target.disabled = true;

    }, 500);

  }

  setFilteredItems() {
    this.dataList = this.filterItems(this.searchTerm);
  }

  filterItems(searchTerm) {
    return this.groups.filter(item => {
      return item.group_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  select(group, tag, group_name) {
    let data = {
      "me": this.id,
      "group_id": group,
      "tag": tag
    };
    this.http.post('https://ggs.tv/api/v1/settag.php', JSON.stringify(data)).subscribe(res => {
      this.presentAlert(group_name);

      this.closeModal();
    });

  }
  closeModal() {
    this.modalController.dismiss();

  }
  none() {
    this.closeModal();

  }
  async presentAlert(name) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Grind Started!',
      message: 'You have started your grind for ' + name,
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
