import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Subject } from "rxjs";
import { ProfileModel } from "../models/profile-model";
import { environment } from "../../environments/environment";
import { Post } from "../models/post";
import { filter, map, takeUntil } from 'rxjs/operators';
import { NavigationExtras } from '@angular/router';


@Injectable()
export class ProfileService {
  profile = [];

  URL = "https://ggs.tv/api/v1/profile/";
  fetchedProfile: Subject<ProfileModel> = new Subject<ProfileModel>();
  fetchedPosts: Subject<Post> = new Subject<Post>();
  fetchedBadges: any;
  response: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {
    if (environment.production === false) {
      // this.URL = this.URL.replace("https://ggs.tv", "http://localhost:7180");
    }
  }

  public fetchProfile(user_id: number) {



    this.httpClient.get(this.URL + user_id).pipe(takeUntil(this.onDestroy$)).subscribe(response => {
      if (response['code'] !== 200) {
        // error state
        return;
      }
      this.fetchedProfile.next(response['data']['user']);
    });
  }


  public fetchUser(user_id: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(user_id)
      }
    };
    const token = localStorage.getItem('Token');


    this.httpClient.get(this.URL + user_id + "?auth_token=" + token).pipe(takeUntil(this.onDestroy$)).subscribe(response => {
      if (response['code'] !== 200) {
        // error state
        return;
      }
      this.fetchedProfile.next(response['data']['user']);
    });
  }

  fetchBadges(user_id: number) {

    return this.httpClient.get(`https://ggs.tv/api/v1/badges.php?user=${user_id}`).pipe(map((res: any) => {

      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }

  fetchGroups(user_id: number) {

    return this.httpClient.get(`https://ggs.tv/api/v1/groups.php?user=${user_id}`).pipe(map((res: any) => {

      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  fetchPictures(user_id: number) {

    return this.httpClient.get(`https://ggs.tv/api/v1/pictures.php?user=${user_id}`).pipe(map((res: any) => {

      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }
  checkFollow(user: number) {

    return this.httpClient.get(`https://ggs.tv/api/v1/connection.php?user=${user}`).pipe(map((res: any) => {

      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );
  }
  fetchFriends(user_id: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(user_id)
      }
    };
    return this.httpClient.get(`https://ggs.tv/api/v1/friends.php?user=${user_id}`).pipe(map((res: any) => {

      return res;
    }),
      filter((res: any) => {

        return true;
      })
    );


  }


  public fetchPosts(user_id: number) {
    this.httpClient.get(`https://ggs.tv/api/v1/timeline.php?timeline=profile&user=${user_id}`).subscribe(response => {

      this.fetchedPosts.next(response['message']);
    });
  }
}
