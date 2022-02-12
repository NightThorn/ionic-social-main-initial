import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-joined',
  templateUrl: './joined.page.html',
  styleUrls: ['./joined.page.scss'],
})
export class JoinedPage implements OnInit {
  me: any;
  groups: any = [];

  constructor(private authService: AuthenticationService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.me = localStorage.getItem("myID");
        this.dataService.getJoinedGroups(this.me).subscribe(res => {
          this.groups = res.message;

        
      });
  
  }
  
  goToGroup(id) {
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };

    this.router.navigate(['group'], navigationExtras);
  }

  }

