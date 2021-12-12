import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    })
    this.dataService.getPostComments(this.data).subscribe(res => {
      this.comments = res.message;
    })
    this.commentForm = this.fb.group({
      comment: [null]
    });
  }

  submitComment() {

  }

  
}
