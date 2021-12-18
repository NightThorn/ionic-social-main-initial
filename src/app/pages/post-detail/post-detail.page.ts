import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { VideoModalPage } from '../video-modal/video-modal.page';
import { HttpClient } from '@angular/common/http';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {

  commentForm: FormGroup;

  
  data: any;
  post: any;
  comments: any;
  offset: number;
  replies: any;
  reply: any;
  activeStoredUserSubscription$;
  me: number;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthenticationService, private route: ActivatedRoute, private modalController: ModalController, private dataService: DataService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
}

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:TOKEN", storedUser.Token);
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:ID", storedUser.UserID);
        this.me = storedUser.UserID;

      }
    })
  
    this.dataService.getPostDetails(this.data).subscribe(res => {
      this.post = res.message;
      for (let i = 0; i < this.post.length; i++) {
        this.offset = moment().utcOffset();

        this.post[i]['time'] = moment.utc(this.post[i]['time']).fromNow();
      }
    });
    this.dataService.getPostComments(this.data).subscribe(res => {
      this.comments = res.message;
      for (let i = 0; i < this.comments.length; i++) {
        this.offset = moment().utcOffset();
        this.comments[i]['time'] = moment.utc(this.comments[i]['time']).fromNow();
          this.dataService.getPostCommentReplies(this.comments[i]['comment_id']).subscribe(res => {
            this.replies = res.message;
            console.log("this repleis", this.replies);

            for (let i = 0; i < this.replies.length; i++) {
              this.offset = moment().utcOffset();

              this.replies[i]['time'] = moment.utc(this.replies[i]['time']).fromNow();
            }
          });
        
      }
    });
    
   
    this.commentForm = this.fb.group({
      message: [null]
    });
  }
showReplies(){
  var element = document.getElementById("repliesContainer");
  element.classList.toggle("replies");
}
  
  
    submitComment(id, user, text) {
      let time = new Date(Date.now())
      let data = {
        "post_id": id,
        "user_id": user,
        "message": text,
        "time": time
      };

      this.http.post('https://ggs.tv/api/v1/post.php', JSON.stringify(data)).subscribe(res => {
        console.log(res);
      });

      this.commentForm.reset();
  }

  user(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/user'], navigationExtras);

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

  
}
