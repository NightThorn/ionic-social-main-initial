import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.page.html',
  styleUrls: ['./me.page.scss'],
})
export class MePage implements OnInit {
  activeStoredUserSubscription$;
  me: any;
  groups: any = [];

  constructor(private authService: AuthenticationService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        this.me = storedUser.UserID;
        console.log(this.me);
        this.dataService.getMyGroups(this.me).subscribe(res => {
          this.groups = res.message;
          console.log("PROFILEPAGE:groups", this.groups);

        }

        )
      };

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

  createGroup() {

    
  }

}