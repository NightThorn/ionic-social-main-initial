import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Subject} from "rxjs";
import {ProfileModel} from "../models/profile-model";


@Injectable()
export class ProfileService {
  profile = [];
  data: any;
  URL = "https://ggs.tv/api/v1/profile/";

  fetchedProfile: Subject<ProfileModel> = new Subject<ProfileModel>();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {}

  public fetchProfile(user_id:number) {
    const token = this.authService.activeStoredUser.getValue().Token;
    if(token === '' || token === null) {
      return;
    }

    console.log("PROFILESERVICE:fetchProfile:TOKEN", token);

    const httpOptions = {
      headers: new HttpHeaders({
        'X-AUTH-TOKEN': token
      })
    };
    console.log("PROFILESERVICE:fetchProfile:URL", this.URL + user_id);
    console.log("PROFILESERVICE:fetchProfile:OPTIONS", httpOptions);
    this.httpClient.get(this.URL + user_id, httpOptions).subscribe(response => {
      console.log("PROFILESERVICE:fetchProfile:RESPONSE", response);
      if(response['code'] !== 200) {
        // error state
        return;
      }

      this.fetchedProfile.next(response['data']['user']);
    });
  }
}
