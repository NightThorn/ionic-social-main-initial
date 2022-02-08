import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Directory } from '@capacitor/filesystem';
import { Storage } from "@ionic/storage-angular";
import moment from 'moment';
const { Filesystem } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private storage: Storage, private router: Router
  ) {
    moment.locale('en');
    this.createCacheFolder();
  }
  async createCacheFolder() {

    await Filesystem.mkdir({

      directory: Directory.Cache,
      path: `CACHED-IMG`
    });
  }

  goHome() {
    this.router.navigate(['tabs/explore']);
  }
  goTournaments() {
    this.router.navigate(['tournaments']);
  }
  goGroups() {
    this.router.navigate(['groups']);
  }
  goRandom() {
    this.router.navigate(['random']);
  }
  goShop() {
    this.router.navigate(['shop']);
  }
  async ngOnInit() {
    // initialize storage right away because why not
    await this.storage.create();

  }
}
