import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GiphyPage } from '../giphy/giphy.page';
import { OverlayEventDetail } from '@ionic/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit, OnDestroy {

  commentForm: FormGroup;
  replyForm: FormGroup;
  replyreplyForm: FormGroup;
  name = 'angular-mentions';

  liked: any;

  result = '';
  html = '';
  data: any;
  post: any;
  comments: any;
  offset: number;
  replies: any;
  me: any;
  gif: any;
  reacted: any;
  items: any;
  myObj: any;
  names: String[] = [];
  commentReplies: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  posttype: any;
  article: any;
  articletext: any;
  constructor(private fb: FormBuilder, private http: HttpClient, public loadingController: LoadingController, private profileService: ProfileService, private authService: AuthenticationService, private route: ActivatedRoute, private modalController: ModalController, private dataService: DataService, private router: Router) {
    this.route.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
  }

  ngOnInit() {
    this.me = localStorage.getItem("myID");




    this.dataService.getPostDetails(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.post = res.message;
      this.posttype = this.post[0]['post_type'];
      if (this.posttype == "article") {
        this.dataService.getarticle(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.article = res.message;
          this.articletext = this.article[0]['text'];

          var temporalDivElement = document.createElement("div");
          // Set the HTML content with the providen
          temporalDivElement.innerHTML = this.articletext;
          // Retrieve the text property of the element (cross-browser support)
          this.result = temporalDivElement.textContent || temporalDivElement.innerText || "";

        });

      }
      for (let i = 0; i < this.post.length; i++) {
        this.offset = moment().utcOffset();

        this.post[i]['time'] = moment.utc(this.post[i]['time']).fromNow();
      }
    });
    this.dataService.getPostComments(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.comments = res.message;
      this.commentReplies = res.replies;
      for (let i = 0; i < this.comments.length; i++) {

        this.offset = moment().utcOffset();
        this.comments[i]['time'] = moment.utc(this.comments[i]['time']).fromNow();


      }
      for (let i = 0; i < this.commentReplies.length; i++) {

        this.offset = moment().utcOffset();
        this.commentReplies[i]['time'] = moment.utc(this.commentReplies[i]['time']).fromNow();


      }
    });

    this.profileService.fetchFriends(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      this.items = res.message;
      this.myObj = Object.values(this.items)[0];
      this.names = [this.myObj["user_name"]];
    });
    this.commentForm = this.fb.group({
      text: [null],
      gif: [null],

    });
    this.replyreplyForm = this.fb.group({
      text: [null],
      commentID: [null],
      gif: [null],

    });
    this.replyForm = this.fb.group({
      text: [null],
      commentID: [null],
      gif: [null],

    });
  }


  showReply(toggle, id, replyname) {
    document.getElementById(toggle).classList.toggle("showReplyForm");
    this.replyForm.get('commentID').setValue(id);

  }
  showReplyReply(toggler, id, replyname) {
    document.getElementById(toggler).classList.toggle("showReplyForm");
    this.replyreplyForm.get('commentID').setValue(id);

  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  async reply(me, text) {
    let loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let time = new Date(Date.now());
    let data = {
      "post_id": text.commentID,
      "node_url": this.data,
      "user_id": me,
      "comment": text,
      "time": time,
      "gif": this.gif
    };
    this.http.post('https://ggs.tv/api/v1/post.php?action=reply', JSON.stringify(data), { headers: headers }).pipe(takeUntil(this.onDestroy$)).subscribe(
      () => { // If POST is success
        this.replyForm.reset();
        loading.dismiss();

        this.dataService.getPostComments(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.comments = res.message;
          this.commentReplies = res.replies;
          for (let i = 0; i < this.comments.length; i++) {

            this.offset = moment().utcOffset();
            this.comments[i]['time'] = moment.utc(this.comments[i]['time']).fromNow();


          }
          for (let i = 0; i < this.commentReplies.length; i++) {

            this.offset = moment().utcOffset();
            this.commentReplies[i]['time'] = moment.utc(this.commentReplies[i]['time']).fromNow();


          }
        });
      },
      (_error) => { // If POST is failed
        loading.dismiss();

        "Error occurred";
      }
    );
  }
  async replyreply(me, text) {
    let loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let time = new Date(Date.now());
    let data = {
      "post_id": text.commentID,
      "node_url": this.data,
      "user_id": me,
      "comment": text,
      "time": time,
      "gif": this.gif
    };
    this.http.post('https://ggs.tv/api/v1/post.php?action=reply', JSON.stringify(data), { headers: headers }).pipe(takeUntil(this.onDestroy$)).subscribe(
      () => { // If POST is success
        this.replyreplyForm.reset();
        loading.dismiss();

        this.dataService.getPostComments(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.comments = res.message;
          this.commentReplies = res.replies;
          for (let i = 0; i < this.comments.length; i++) {

            this.offset = moment().utcOffset();
            this.comments[i]['time'] = moment.utc(this.comments[i]['time']).fromNow();


          }
          for (let i = 0; i < this.commentReplies.length; i++) {

            this.offset = moment().utcOffset();
            this.commentReplies[i]['time'] = moment.utc(this.commentReplies[i]['time']).fromNow();


          }
        });
      },
      (_error) => { // If POST is failed
        loading.dismiss();

        "Error occurred";
      }
    );
  }
  async submitComment(id, user, text) {
    let loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    let time = new Date(Date.now());
    let data = {
      "post_id": id,
      "user_id": user,
      "comment": text,
      "time": time,
      "gif": this.gif

    };

    this.http.post('https://ggs.tv/api/v1/post.php?action=comment', JSON.stringify(data), { headers: headers }).pipe(takeUntil(this.onDestroy$)).subscribe(
      () => { // If POST is success
        this.commentForm.reset();
        loading.dismiss();

        this.dataService.getPostComments(this.data).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          this.comments = res.message;
          this.commentReplies = res.replies;
          for (let i = 0; i < this.comments.length; i++) {

            this.offset = moment().utcOffset();
            this.comments[i]['time'] = moment.utc(this.comments[i]['time']).fromNow();


          }
          for (let i = 0; i < this.commentReplies.length; i++) {

            this.offset = moment().utcOffset();
            this.commentReplies[i]['time'] = moment.utc(this.commentReplies[i]['time']).fromNow();


          }
        });
      },
      (_error) => {
        loading.dismiss();
        // If POST is failed
        "Error occurred";
      }
    );

  }
  async onGif(e) {
    const modal = await this.modalController.create({
      component: GiphyPage,
      backdropDismiss: false,
      cssClass: 'modal'
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        this.gif = detail.data;

        var elem = document.createElement("img");
        elem.setAttribute("src", this.gif);
        elem.setAttribute("height", "200");
        elem.setAttribute("width", "100%");
        elem.setAttribute("alt", "IMG");

        document.getElementById("text").appendChild(elem);
        document.getElementById("gifid").style.border = "thick solid lime";
        document.getElementById("imageid").style.border = "none";
        document.getElementById("videoid").style.border = "none";

        this.commentForm.patchValue({
          gif: this.gif
        });
      }
    });
    await modal.present();

  };
  async replyGif(e) {
    const modal = await this.modalController.create({
      component: GiphyPage,
      backdropDismiss: false,
      cssClass: 'modal'
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        this.gif = detail.data;

        var elem = document.createElement("img");
        elem.setAttribute("src", this.gif);
        elem.setAttribute("height", "200");
        elem.setAttribute("width", "100%");
        elem.setAttribute("alt", "IMG");

        document.getElementById("test").appendChild(elem);
        document.getElementById("rgifid").style.border = "thick solid lime";
        

        this.replyForm.patchValue({
          gif: this.gif
        });
      }
    });
    await modal.present();

  };
  async replyreplyGif(e) {
    const modal = await this.modalController.create({
      component: GiphyPage,
      backdropDismiss: false,
      cssClass: 'modal'
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        this.gif = detail.data;

        let imag = document.createElement("img");
        imag.setAttribute("src", this.gif);
        imag.setAttribute("height", "200");
        imag.setAttribute("width", "100%");
        imag.setAttribute("alt", "IMG");

        document.getElementById("test").appendChild(imag);
        document.getElementById("rrgifid").style.border = "thick solid lime";


        this.replyreplyForm.patchValue({
          gif: this.gif
        });
      }
    });
    await modal.present();

  };
  user(id) {

    this.router.navigate(['/user/' + id]);

  }


  async navigateToModal(source) {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      backdropDismiss: false,
      cssClass: 'modal',

      componentProps: {
        'source': source
      }
    });
    modal.present();
  }
  commentlike(id, toggle) {
    let data = {
      "post_id": this.data,
      "comment_id": id,
      "user_id": this.me,
    };
    document.getElementById(toggle).classList.remove("unliked");
    document.getElementById(toggle).classList.add("liked");

    this.liked = "1";
    this.http.post('https://ggs.tv/api/v1/post.php?action=commentlike', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });
  }
  commentunlike(id, toggle) {
    let data = {
      "comment_id": id,
      "user_id": this.me,
    };
    document.getElementById(toggle).classList.add("unliked");
    document.getElementById(toggle).classList.remove("liked");
    this.liked = "0";
    this.http.post('https://ggs.tv/api/v1/post.php?action=commentunlike', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      document.getElementById(toggle).classList.toggle("liked");

    });
  }

}
