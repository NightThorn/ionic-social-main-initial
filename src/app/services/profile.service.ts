import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';


@Injectable()
  export class ProfileService {
  profile = [];
  data: any;
  URL = "https://ggs.tv/api/v1/profile/";
  private _storage:Storage;

  key_token = 'auth_token';
  key_user_id = 'auth_user_id';

    constructor(private httpClient: HttpClient, private authService: AuthenticationService
      ) {}
    async fetchProfile(user_id) {
      
      let token:string = this._storage.get(this.key_token);
      let userId:number = this._storage.get(this.key_user_id);

      const httpOptions = {
        headers: new HttpHeaders({
          'X-AUTH-TOKEN':  token
        })
      };
        const response = await this.httpClient.get(this.URL + user_id, httpOptions).subscribe(response => {
          console.log(response);    
          this.data = response;

        });
         }
        }