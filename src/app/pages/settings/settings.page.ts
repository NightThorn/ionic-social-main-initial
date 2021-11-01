import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  storage: any;

  constructor(private router: Router){}

  ngOnInit() {
  }

  async logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');


    this.router.navigateByUrl('/', {replaceUrl: true});
      }
}
