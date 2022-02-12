import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs/Rx';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  isClicked = false;
  count: any;
  me = localStorage.getItem("myID");

  constructor(private router: Router, private authService: AuthenticationService, private dataService: DataService) {

    this.dataService.getCounter(this.me).subscribe(res => {
      this.count = res.message;
    });
    Observable.interval(10000).subscribe(x => {
      this.dataService.getCounter(this.me).subscribe(res => {
        this.count = res.message;
      });
    });

  }

  remove() {
    this.dataService.resetCounter(this.me).subscribe(res => {
    });
  }
  resetmessages() {
    this.dataService.resetmessages(this.me).subscribe(res => {
    });
  }
  goToTournaments() {
    this.router.navigate(['tournaments']);
  }
  goToRandom() {
    this.router.navigate(['random']);
  }
  goToStreams() {
    this.router.navigate(['streams']);
  }
  goToGroups() {
    this.router.navigate(['groups']);
  }
  onClick($event) {
    this.isClicked = !this.isClicked;
  }
}
