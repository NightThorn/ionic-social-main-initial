import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { TimeagoModule } from 'ngx-timeago';
import moment from 'moment';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  public searchTerm: string = "";
  public items: any;
  public dataList: any = [];
  messages: any = [];
  activeStoredUserSubscription$;
  private topLimit: number = 15;
  public dataL: Array<object> = [];
  offset: number;

  constructor(private router: Router, private dataService: DataService, private authService: AuthenticationService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:TOKEN", storedUser.Token);
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:ID", storedUser.UserID);

        this.dataService.getMessages(storedUser.UserID).subscribe(res => {

          this.messages = res.message;
          this.dataList = this.messages.slice(0, this.topLimit);
          for (let i = 0; i < this.dataList.length; i++) {
            this.offset = moment().utcOffset();

            this.dataList[i]['time'] = moment.utc(this.dataList[i]['time']).fromNow();
          }
          console.log("PROFILEPAGE:messages", this.messages);

        });
      }
    })
    this.setFilteredItems();

  }
  loadData(event) {
    setTimeout(() => {
      this.topLimit += 10;
      this.dataList = this.messages.slice(0, this.topLimit);
      event.target.complete();
      if (this.dataList.length == this.dataL.length)
        event.target.disabled = true;

    }, 500);

  }

  setFilteredItems() {
    this.dataList = this.filterItems(this.searchTerm);
  }
  filterItems(searchTerm) {
    return this.messages.filter(item => {
      return item.user_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  navigateToContacts() {
    this.router.navigate(['contacts']);
  }

  navigateToChat(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        chat: JSON.stringify(id)
      }
    };
    this.router.navigate(['chat'], navigationExtras);
  }


}
