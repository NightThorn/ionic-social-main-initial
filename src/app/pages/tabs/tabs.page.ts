import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  isClicked = false;
  activeStoredUserSubscription$;
  me: number;
  count: any;
  constructor(private router: Router, private authService: AuthenticationService, private dataService: DataService) {

    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {

        this.me = storedUser.UserID;
        this.dataService.getCounter(this.me).subscribe(res => {
          this.count = res.message;
        });
        Observable.interval(10000).subscribe(x => {
          this.dataService.getCounter(this.me).subscribe(res => {
            this.count = res.message;
          });
        });
      } else {
        this.router.navigate(['login']);

      }
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
