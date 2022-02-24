import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ɵsetCurrentInjector } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { async, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoredUser } from 'src/app/models/stored-user';
import { DataService } from 'src/app/services/data.service';
import { FcmService } from 'src/app/services/fcm.service';
import { AuthenticationService } from "../../services/authentication.service";
import { BlockedPage } from '../blocked/blocked.page';
import { EditPage } from '../edit/edit.page';
import { GrindPage } from '../grind/grind.page';
import { ModalPage } from '../modal/modal.page';
import { PasswordPage } from '../password/password.page';
import { VideoModalPage } from '../video-modal/video-modal.page';
import { XpmodalPage } from '../xpmodal/xpmodal.page';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {
  storage: any;
  value: string;
  me: any;
  points: any;
  wallet: any;
  subscribed: any;
  mod: any;
  staff: any;
  banned: any;
  myXP: any;
  myWallet: any;
  user_package: number;
  boosted_posts: number;
  user: any;
  bio: any;
  location: any;
  username: any;
  email: any;
  gender: any;
  relationship: any;
  birthdate: any;
  searching: number;
  current: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  live: string;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private dataService: DataService,
    private modalController: ModalController,
    private http: HttpClient,
    private fcm: FcmService
  ) { }

  ngOnInit() {
    this.me = localStorage.getItem("myID");
    this.live = localStorage.getItem("live");

    this.dataService.getUser(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.user = res.message;
      this.bio = this.user[0]['user_biography'];
      this.location = this.user[0]['user_current_city'];
      this.gender = this.user[0]['user_gender'];
      this.current = this.user[0]['user_name'];
      this.username = this.user[0]['user_name'];
      this.relationship = this.user[0]['user_relationship'];
      this.birthdate = this.user[0]['user_birthdate'];
      this.searching = this.user[0]['searching'];

      this.email = this.user[0]['user_email'];

    });
    this.value = localStorage.getItem("filter");


  }
  gotoShop() {
    this.router.navigate(['shop']);
  }
  goinglive() {
    let time = new Date(Date.now());
    let data = {
      "user": this.me,
    };
    localStorage.setItem("live", "true");

    document.getElementById("livebutton").style.color = "black";
    document.getElementById("livebutton").classList.add('unfollow-btn');
    document.getElementById("livebutton").innerHTML = "Streaming!";

    this.http.post('https://ggs.tv/api/v1/user.php?action=live', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });
  }
  notlive() {
    let time = new Date(Date.now());
    let data = {
      "user": this.me,
    };
    localStorage.setItem("live", "false");
    document.getElementById("unlivebutton").style.color = "black";
    document.getElementById("unlivebutton").classList.add('follow-btn');
    document.getElementById("unlivebutton").classList.remove('unfollow-btn');

    document.getElementById("unlivebutton").innerHTML = "Going Live!";

    this.http.post('https://ggs.tv/api/v1/user.php?action=unlive', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });
  }

  following() {
    localStorage.setItem("filter", "following");
    this.value = "following";
  }

  all() {
    localStorage.setItem("filter", "all");
    this.value = "all";


  }
  logout() {
    this.authService.destroy();
    const x = localStorage.getItem("notiToken");

    this.fcm.removeToken(this.me, x);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }


  async openModalPost() {

    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'modal',
      backdropDismiss: false

    });
    modal.present();
  }
  async openXPModal(xp) {
    const modal = await this.modalController.create({
      component: XpmodalPage,
      cssClass: 'modal',
      backdropDismiss: false,
      componentProps: {
        'xp': xp,

      }

    });
    modal.present();
  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  async blocked(id) {
    const modal = await this.modalController.create({
      component: BlockedPage,
      cssClass: 'modal',
      backdropDismiss: false,
      componentProps: {
        'me': id,

      }

    });
    modal.present();
  }
  numFormatter(num) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }
  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

  }


  async edit(id, current, bio, location, username, email, gender, relationship, birthdate, searching) {

    const modal = await this.modalController.create({
      component: EditPage,
      backdropDismiss: false,
      componentProps: {
        'id': id,
        'current': current,
        'bio': bio,
        'location': location,
        'username': username,
        'email': email,
        'gender': gender,
        'relationship': relationship,
        'birthdate': birthdate,
        'searching': searching

      }

    });
    modal.present();
  }

  async openVideoModal(source) {
    const modal = await this.modalController.create({
      component: VideoModalPage,
      backdropDismiss: false,
      cssClass: 'modal',

      componentProps: {
        'source': source
      }
    });
    modal.present();
  }

  async password(id) {
    const modal = await this.modalController.create({
      component: PasswordPage,
      backdropDismiss: false,
      cssClass: 'modal',

      componentProps: {
        'id': id
      }
    });
    modal.present();
  }
  async grind(id) {
    const modal = await this.modalController.create({
      component: GrindPage,
      backdropDismiss: false,
      cssClass: 'modal',

      componentProps: {
        'id': id
      }
    });
    modal.present();
  }
}

