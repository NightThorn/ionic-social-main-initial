import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-grinding',
  templateUrl: './grinding.page.html',
  styleUrls: ['./grinding.page.scss'],
})
export class GrindingPage implements OnInit {
  me: any;
  @Input() group_id: number;

  res: any = [];
  public dataL: Array<object> = [];
  public grinders: any = [];
  activatedroute: any;
  data: any;
  public searchTerm: string = "";
  public items: any;
  private topLimit: number = 15;
  public dataList: any = [];



  constructor(private modalController: ModalController, private router: Router, private dataService: DataService, private alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.me = localStorage.getItem("myID");

      this.dataService.grinding(this.group_id).subscribe(res => {
        this.grinders = res.message;
        console.log(this.grinders);
        this.dataList = this.grinders.slice(0, this.topLimit);

      });


  }
  loadData(event) {
    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.grinders.slice(0, this.topLimit);
      event.target.complete();
      if (this.dataList.length == this.dataL.length)
        event.target.disabled = true;

    }, 500);

  }

  setFilteredItems() {
    this.dataList = this.filterItems(this.searchTerm);
  }
  filterItems(searchTerm) {
    return this.grinders.filter(item => {
      return item.user_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  invite(user) {
    let data = {
      "me": this.me,
      "userid": user
    };
    this.http.post('https://ggs.tv/api/v1/group.php?action=invite&group=' + this.group_id, JSON.stringify(data)).subscribe(res => {
      this.presentAlert();

      this.closeModal();
      window.location.reload();
    });

  }
  closeModal() {
    this.modalController.dismiss();

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Application Submitted',
      message: 'The group owner will look over your application',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
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
}
