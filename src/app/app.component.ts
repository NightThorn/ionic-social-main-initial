import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage-angular";
import moment from 'moment';


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
