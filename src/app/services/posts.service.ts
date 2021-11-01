import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  RequestedPosts = new Subject<Post[]>();

  constructor(
    private http: HttpClient
  ) { }

  FetchPostsForUser(userId: number)
  {
    this.http.get(`https://ggs.tv/api/v1/posts.php?controller=user&user=${userId}`)
      .subscribe((data: any) => {
        if(data?.code !== 200) {
          // throw error
        }

        if(!data?.data?.timeline) {
          // throw error
        }

        const posts: Post[] = [];
        for (let i = 0; i < data.data.timeline.length; i++) {
          let post = data.data.timeline[i];

          posts.push({
            ID: post.post_id,
            UserID: post.user_id,
            IsWall: post.in_wall === "'1'",
            IsGroup: post.in_group === "'1'",
            Content: post.text
          } as Post)
        }
        this.RequestedPosts.next(posts);
      })
  }
}