import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import moment from 'moment';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { ApplicationsPage } from '../../applications/applications.page';
import { ApplyPage } from '../../apply/apply.page';
import { EditgroupPage } from '../../editgroup/editgroup.page';
import { GrindingPage } from '../../grinding/grinding.page';
import { GroupadminsPage } from '../../groupadmins/groupadmins.page';
import { GrouppostPage } from '../../grouppost/grouppost.page';
import { ImageModalPage } from '../../image-modal/image-modal.page';
import { ModalPage } from '../../modal/modal.page';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  data: any;
  tabType = 'posts';

  group: any;
  activeStoredUserSubscription$;
  me: any;
  admin: any;
  joined: any;
  joinedGroups: any;
  group_id: any;
  feed: any;
  members: any;
  offset: number;
  media: any;

  id: any;
  groupfeed: any;

  constructor(private activeRoute: ActivatedRoute, private http: HttpClient, private router: Router, private authService: AuthenticationService, private modalController: ModalController, private dataService: DataService) { }

  ngOnInit() {


    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {

      this.me = storedUser.UserID;
    });

    this.dataService.getRandomGroup().subscribe(res => {
      this.group = res.message;
      this.group_id = this.group[0]['group_id'];

      this.dataService.getGroupFeed(this.group_id).subscribe(res => {
        this.feed = res.message;
        console.log(this.feed);
        for (let i = 0; i < this.feed.length; i++) {
          this.offset = moment().utcOffset();
          this.feed[i]['total'] = +this.feed[i]['reaction_love_count'] + +this.feed[i]['reaction_like_count'] + +this.feed[i]['reaction_haha_count'] + +this.feed[i]['reaction_wow_count'];

          this.feed[i]['time'] = moment.utc(this.feed[i]['time']).fromNow();
        }

      });

      this.dataService.getGroupMedia(this.id).subscribe(res => {
        this.media = res.message;

      });
    });
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
  join(user) {
    let data = {
      "userid": user,
    };
    this.joined = 2;

    this.http.post('https://ggs.tv/api/v1/group.php?action=join&group=' + this.id, JSON.stringify(data)).subscribe(res => {
    });
  }
  leave(user) {
    let data = {
      "userid": user,
    };
    this.joined = 0;

    this.http.post('https://ggs.tv/api/v1/group.php?action=leave&group=' + this.id, JSON.stringify(data)).subscribe(res => {
    });
  }


  async apply(id) {

    const modal = await this.modalController.create({
      component: ApplyPage,
      cssClass: 'modal-container',
      componentProps: {
        'group_id': id,

      },
    });
    return await modal.present();
  }


  doRefresh(event) {
    this.dataService.getRandomGroup().subscribe(res => {
      this.group = res.message;
      this.group_id = this.group[0]['group_id'];

      this.dataService.getGroupFeed(this.group_id).subscribe(res => {
        this.feed = res.message;
        console.log(this.feed);
        for (let i = 0; i < this.feed.length; i++) {
          this.offset = moment().utcOffset();
          this.feed[i]['total'] = +this.feed[i]['reaction_love_count'] + +this.feed[i]['reaction_like_count'] + +this.feed[i]['reaction_haha_count'] + +this.feed[i]['reaction_wow_count'];

          this.feed[i]['time'] = moment.utc(this.feed[i]['time']).fromNow();
        }

      });

      this.dataService.getGroupMedia(this.id).subscribe(res => {
        this.media = res.message;

      });
    });
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }


}