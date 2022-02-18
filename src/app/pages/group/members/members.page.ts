import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit, OnDestroy {
  data: any;
  members: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  res: any = [];
  public dataL: Array<object> = [];
  public friends: any = [];
  activatedroute: any;
  public searchTerm: string = "";
  public items: any;
  private topLimit: number = 15;
  public dataList: any = [];
  admins: any;
  iAdmin: boolean;
  me: string;
  id: string;

  constructor(private route: ActivatedRoute, private alertctrl: AlertController, private http: HttpClient, private dataService: DataService, private router: Router) {



  }

  ngOnInit() {
    this.me = localStorage.getItem("myID");
    this.id = this.route.snapshot.paramMap.get('id');

    this.dataService.getGroupMembers(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.members = res.message;
      this.dataList = this.members.slice(0, this.topLimit);

    });
    this.dataService.getGroupAdmins(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.admins = res.message;
      var iAdmin = this.admins.find(message => message.user_id == this.me)

      if (iAdmin) {
        this.iAdmin = true;
      }

    });
  }
  loadData(event) {
    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.members.slice(0, this.topLimit);
      event.target.complete();
      if (this.dataList.length == this.dataL.length)
        event.target.disabled = true;

    }, 500);

  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  setFilteredItems() {
    this.dataList = this.filterItems(this.searchTerm);
  }
  filterItems(searchTerm) {
    return this.members.filter(item => {
      return item.user_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  user(id) {

    this.router.navigate(['/user/' + id]);

  }
  async kick(id) {


    const alert = await this.alertctrl.create({

      header: 'Kick this member?',
      message: 'They will be removed from the group.',

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Kick',
          handler: (test) => {
            let data = {
              "user": id,
              "group": this.id,
            };
            this.http.post('https://ggs.tv/api/v1/removemember.php', JSON.stringify(data))
              .pipe(takeUntil(this.onDestroy$)).subscribe(async () => {
                let alert = await this.alertctrl.create({
                  header: 'User Kicked',
                  message: 'You have kicked this user.',
                  buttons: ['OK']
                });
                alert.present();
                this.dataService.getGroupMembers(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
                  this.members = res.message;
                  this.dataList = this.members.slice(0, this.topLimit);

                });
              });
          }
        }
      ]
    });
    await alert.present();
  }
}
