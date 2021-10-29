import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router){}

  ngOnInit() {
  }

  async logout(){
await this.authService.logout();
this.router.navigateByUrl('/', {replaceUrl: true});
  }
  
}
