import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild("scrollElement") content: IonContent;

  messageForm: FormGroup;
  chat = [];
  messages: any;
  data: any;
  activeStoredUserSubscription$;
  currentUser: number;
  id: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private profileService: ProfileService, private authService: AuthenticationService, private dataService: DataService, private router: Router) {

    this.route.queryParams.subscribe(params => {
      if (params && params.chat) {
        this.id = JSON.parse(params.chat);
      }
    });

  }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:TOKEN", storedUser.Token);
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:ID", storedUser.UserID);

      }
      this.dataService.getChat(this.id).subscribe(res => {
        this.chat = res.message;
        this.currentUser = storedUser.UserID;
        console.log(this.chat);
        setTimeout(() => {
          this.updateScroll();
        }, 500);
      });

      this.messageForm = this.fb.group({
        message: [null],
      });
    });

  }
  updateScroll() {
    this.content.scrollToBottom();
  }
  
  submitMessage() {
    this.messageForm.reset();
  }
}
