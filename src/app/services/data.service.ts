import { Injectable } from '@angular/core';
import mockDataJson from 'src/app/data/data.json';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {
  mockData = mockDataJson;

  constructor(private http: HttpClient) { }

  getSearch(query) {


    return this.http.get(`https://ggs.tv/api/v1/search.php?query=${query}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }
  getSearchGroups(query) {


    return this.http.get(`https://ggs.tv/api/v1/search.php?query=${query}&tab=groups`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }
  getSearchPeople(query) {


    return this.http.get(`https://ggs.tv/api/v1/search.php?query=${query}&tab=people`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }
  getTournaments() {


    return this.http.get(`https://ggs.tv/api/v1/tournaments.php`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }

  getFeed(user) {
    return this.http.get(`https://ggs.tv/api/v1/feed.php?filter=recent&user=${user}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }

  getAllStreams() {


    return this.http.get(`https://ggs.tv/api/v1/streams.php?stream=all`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }
  getProStreams() {


    return this.http.get(`https://ggs.tv/api/v1/streams.php?stream=pro`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }
  getNotis(user_id) {


    return this.http.get(`https://ggs.tv/api/v1/notifications.php?user=${user_id}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }
  getRandomClip() {


    return this.http.get(`https://ggs.tv/api/v1/random.php?tab=video`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }
  getRandomUser(user_id: number) {


    return this.http.get(`https://ggs.tv/api/v1/random.php?tab=user&userid=${user_id}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }
  getRandomGroup() {


    return this.http.get(`https://ggs.tv/api/v1/random.php?tab=group`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }
  getRandomStream() {


    return this.http.get(`https://ggs.tv/api/v1/random.php?tab=stream`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }
  getHistories() {
    return this.mockData.histories;
  }

  getSeenFirtsHistories() {
    return this.mockData.histories.sort((story1: any, story2: any) =>
      story1.seen > story2.seen ? 1 : story1.seen == story2.seen ? 0 : -1
    );
  }

  getArticles() {
    return this.mockData.articles;
  }

  getEvents() {
    return this.mockData.events;
  }

  getFollow() {
    return this.mockData.follow;
  }



  getStories(id) {

    return this.http.get(`https://ggs.tv/api/v1/stories.php?user=${id}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }
  getLatestVid(id) {

    return this.http.get(`https://ggs.tv/api/v1/followingvids.php?user=${id}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }
  getJoinedGroups(user) {
    return this.http.get(`https://ggs.tv/api/v1/getgroups.php?filter=joined&user=${user}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }
  getMyGroups(user) {
    return this.http.get(`https://ggs.tv/api/v1/getgroups.php?filter=me&user=${user}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }
  getDiscoverGroups(user) {
    return this.http.get(`https://ggs.tv/api/v1/getgroups.php?filter=discover&user=${user}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );

  }
  getGroup(id) {

    return this.http.get(`https://ggs.tv/api/v1/group.php?group=${id}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }
  getGroupMembers(id) {

    return this.http.get(`https://ggs.tv/api/v1/groupmembers.php?group=${id}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }
  getGroupMedia(id) {

    return this.http.get(`https://ggs.tv/api/v1/groupmedia.php?group=${id}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }
  getGroupFeed(id) {

    return this.http.get(`https://ggs.tv/api/v1/groupfeed.php?group=${id}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }

  getUsers() {
    return this.mockData.users;
  }
  getPostDetails(post_id) {


    return this.http.get(`https://ggs.tv/api/v1/getpost.php?post=${post_id}`).pipe(map((res: any) => {

      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }

  getPostCommentReplies(post_id) {


    return this.http.get(`https://ggs.tv/api/v1/getcommentreplies.php?post=${post_id}`).pipe(map((res: any) => {

      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }
  getMediaPost(post_id) {
    return this.http.get(`https://ggs.tv/api/v1/getmediapost.php?post=${post_id}`).pipe(map((res: any) => {
      console.log("embed?", res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }
  getPostComments(post_id) {


    return this.http.get(`https://ggs.tv/api/v1/postcomments.php?post=${post_id}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }
  getMessages(user_id) {


    return this.http.get(`https://ggs.tv/api/v1/messages.php?user=${user_id}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }

  getLatestChat(id) {
    return this.http.get(`https://ggs.tv/api/v1/latestchat.php?chat=${id}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }

  getChat(id) {


    return this.http.get(`https://ggs.tv/api/v1/chat.php?chat=${id}`).pipe(map((res: any) => {

      console.log(res);
      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }
  getNotifications() {
    return this.mockData.notifications;
  }

}


