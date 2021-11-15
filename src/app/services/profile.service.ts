import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Subject } from "rxjs";
import { ProfileModel } from "../models/profile-model";
import { environment } from "../../environments/environment";
import { Post } from "../models/post";


@Injectable()
export class ProfileService {
  profile = [];
  data: any;
  URL = "https://ggs.tv/api/v1/profile/";
  fetchedProfile: Subject<ProfileModel> = new Subject<ProfileModel>();
  fetchedPosts: Subject<Post> = new Subject<Post>();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {
    if (environment.production === false) {
      // this.URL = this.URL.replace("https://ggs.tv", "http://localhost:7180");
    }
  }

  public fetchProfile(user_id: number) {
    const token = this.authService.activeStoredUser.getValue().Token;
    if (token === '' || token === null) {
      return;
    }
    console.log("PROFILESERVICE:fetchProfile:TOKEN", token);
    console.log("PROFILESERVICE:fetchProfile:URL", this.URL + user_id);
    this.httpClient.get(this.URL + user_id + "?auth_token=" + token).subscribe(response => {
      console.log("PROFILESERVICE:fetchProfile:RESPONSE", response);
      if (response['code'] !== 200) {
        // error state
        return;
      }
      this.fetchedProfile.next(response['data']['user']);
    });
  }

  public fetchPosts(user_id: number) {
    this.httpClient.get(`https://ggs.tv/api/v1/posts.php?controller=user&user=${user_id}`).subscribe(response => {
      console.log("PROFILESERVICE:fetchposts:RESPONSE", response);

      this.fetchedPosts.next(response['data']['timeline']);
    });
  }
}
