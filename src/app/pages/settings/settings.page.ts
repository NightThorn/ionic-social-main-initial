import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import {AuthenticationService} from "../../services/authentication.service";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  storage: any;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){}

  ngOnInit() {

  }

  async logout() {
    await this.authService.destroy();
    this.router.navigateByUrl('/', {replaceUrl: true});
  }

}
