import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import moment from 'moment';
import { DataService } from 'src/app/services/data.service';

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

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private dataService: DataService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
}

  ngOnInit() {
    this.dataService.getPostDetails(this.data).subscribe(res => {
      this.post = res.message;
      for (let i = 0; i < this.post.length; i++) {
        this.offset = moment().utcOffset();

        this.post[i]['time'] = moment.utc(this.post[i]['time']).fromNow();
      }
    })
    this.dataService.getPostComments(this.data).subscribe(res => {
      this.comments = res.message;
      for (let i = 0; i < this.comments.length; i++) {
        this.offset = moment().utcOffset();

        this.comments[i]['time'] = moment.utc(this.comments[i]['time']).fromNow();
      }
    })
    this.commentForm = this.fb.group({
      comment: [null]
    });
  }

  submitComment() {

  }

  user(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/user'], navigationExtras);

  }
}
