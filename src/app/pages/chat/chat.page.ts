import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import moment from 'moment';
import { now } from 'moment';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  @ViewChild("scrollElement") content: IonContent;

  messageForm: FormGroup;
  chat = [];
  messages: any;
  data: any;
  currentUser: number;
  id: any;
  me: any;
  myMessage: Object;
  latest: any;
  lastMessageID: any;
  offset: number;
  username: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private profileService: ProfileService, private authService: AuthenticationService, private dataService: DataService, private router: Router) {

    this.route.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      if (params && params.chat) {
        this.id = JSON.parse(params.chat);
        this.username = JSON.parse(params.username)
      }
    });
    this.lastMessageID = interval(2000).subscribe((func => {
      this.getLastMessage(this.id);
    }))
  }

  ngOnInit() {

    this.me = localStorage.getItem("myID");
    this.dataService.getChat(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.chat = res.message;
      for (let i = 0; i < this.chat.length; i++) {
        this.offset = moment().utcOffset();

        this.chat[i]['time'] = moment.utc(this.chat[i]['time']).fromNow();
      }
      this.currentUser = this.me;
      setTimeout(() => {
        this.updateScroll();
      }, 500);
    });

    this.messageForm = this.fb.group({
      message: [null],
    });

  }


  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  updateScroll() {
    this.content.scrollToBottom();
  }
  getLastMessage(id) {
    this.dataService.getLatestChat(id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.latest = res.message;

      var last = this.chat.find(message => message.message_id == this.latest[0]['message_id']);

      if (last) {
      } else {

        this.dataService.getChat(this.id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
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

    this.http.post('https://ggs.tv/api/v1/sendmessage.php', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });

    this.messageForm.reset();

  }
  ionViewDidLeave() {
    this.lastMessageID.unsubscribe();
  }
  user(id) {

    this.router.navigate(['/user/' + id]);

  }

}
