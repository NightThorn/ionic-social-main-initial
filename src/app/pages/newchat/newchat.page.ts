import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import moment from 'moment';
import { interval } from 'rxjs';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-newchat',
  templateUrl: './newchat.page.html',
  styleUrls: ['./newchat.page.scss'],
})
export class NewchatPage implements OnInit {
  @ViewChild("scrollElement") content: IonContent;

  messageForm: FormGroup;
  chat = [];
  messages: any;
  data: any;
  activeStoredUserSubscription$;
  currentUser: number;
  id: any;
  me: number;
  myMessage: Object;
  latest: any;
  lastMessageID: any;
  offset: number;
  check: any;
  convo: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private profileService: ProfileService, private authService: AuthenticationService, private dataService: DataService, private router: Router) {

    this.route.queryParams.subscribe(params => {
      if (params && params.user) {
        this.check = JSON.parse(params.user);
      }
    });
    this.lastMessageID = interval(2000).subscribe((func => {
      this.getLastMessage(this.id);
    }))
  }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {

      this.me = storedUser.UserID;
      this.dataService.newChat(this.check, this.me).subscribe(res => {
        this.chat = res.message;
        if (res.success === true) {
          this.id = this.chat[0]['conversation_id'];
          for (let i = 0; i < this.chat.length; i++) {
            this.offset = moment().utcOffset();

            this.chat[i]['time'] = moment.utc(this.chat[i]['time']).fromNow();
          }
          this.currentUser = storedUser.UserID;
          setTimeout(() => {
            this.updateScroll();
          }, 500);
        }
        else {
          this.id = res;
        }
      });

      this.messageForm = this.fb.group({
        message: [null],
      });
    });

  }
  updateScroll() {
    this.content.scrollToBottom();
  }
  getLastMessage(id) {
    this.dataService.getLatestChat(id).subscribe(res => {
      this.latest = res.message;

      var last = this.chat.find(message => message.message_id == this.latest[0]['message_id']);

      if (last) {
      } else {

        this.dataService.getChat(this.id).subscribe(res => {
          this.chat = res.message;
          for (let i = 0; i < this.chat.length; i++) {
            this.offset = moment().utcOffset();

            this.chat[i]['time'] = moment.utc(this.chat[i]['time']).fromNow();
          }
          setTimeout(() => {
            this.updateScroll();
          }, 500);
        });
      }
    });

  }
  submitMessage(id, user, text) {
    let time = new Date(Date.now())
    let data = {
      "conversation_id": id,
      "user_id": user,
      "message": text,
      "time": time
    };

    this.http.post('https://ggs.tv/api/v1/sendmessage.php', JSON.stringify(data)).subscribe(res => {
    });

    this.messageForm.reset();
    this.getLastMessage(this.id);

  }


}
