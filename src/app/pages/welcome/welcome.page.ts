import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
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


  goToLogin() {
   
      this.router.navigate(['/login']);
    
  }
    goToRegister() {
  
      this.router.navigate(['/register']);
    
}
  }
 

