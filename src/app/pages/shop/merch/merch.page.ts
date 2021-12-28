import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-merch',
  templateUrl: './merch.page.html',
  styleUrls: ['./merch.page.scss'],
})
export class MerchPage implements OnInit {
  activeStoredUserSubscription$;
  me: number;
  merch: any;

  constructor(private authService: AuthenticationService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        this.me = storedUser.UserID;
        console.log(this.me);
        this.dataService.getMerch().subscribe(res => {
          this.merch = res.message;

        }

        )
      };

    });
  }

}
