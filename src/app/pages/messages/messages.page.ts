import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  messages: any;
  activeStoredUserSubscription$;

  constructor(private router: Router, private dataService: DataService, private authService: AuthenticationService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:TOKEN", storedUser.Token);
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:ID", storedUser.UserID);

        this.dataService.getMessages(storedUser.UserID).subscribe(res => {
          this.messages = res.message;
          console.log("PROFILEPAGE:messages", this.messages);

        });      }
    })

  }

  navigateToContacts() {
    this.router.navigate(['contacts']);
  }

  navigateToChat(item) {
    let navigationExtras: NavigationExtras = {
      state: {
        user: item
      }
    };
    this.router.navigate(['chat'], navigationExtras);
  }

}
