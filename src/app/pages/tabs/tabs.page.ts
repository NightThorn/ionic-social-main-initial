import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  isClicked = false;
  constructor(private router: Router) {}

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
