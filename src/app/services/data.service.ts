import { Injectable } from '@angular/core';
import mockDataJson from 'src/app/data/data.json';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {
  mockData = mockDataJson;

  constructor(private http: HttpClient) { }
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
  getRandomUser() {


    return this.http.get(`https://ggs.tv/api/v1/random.php?tab=user`).pipe(map((res: any) => {

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

  getFeed() {

    return this.mockData.feeds;
  }

  getStories() {
    return this.mockData.stories;
  }

  getGroups() {
    return this.mockData.groups;
  }

  getComments() {
    return this.mockData.comments;
  }

  getUsers() {
    return this.mockData.users;
  }

  getMessages() {
    return this.mockData.messages;
  }
  getNotifications() {
    return this.mockData.notifications;
  }
}
