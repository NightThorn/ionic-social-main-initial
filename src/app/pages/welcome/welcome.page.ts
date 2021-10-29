import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { INTRO_KEY } from 'src/app/guards/intro.guard';
const { Storage } = Plugins;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

 

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async goToLogin() {
    await Storage.set({key: INTRO_KEY, value: 'true'});
    this.router.navigate(['/login']);
  }

  async goToRegister() {
    await Storage.set({key: INTRO_KEY, value: 'true'});

    this.router.navigate(['/register']);
  }

}
