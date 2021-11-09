import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';


 class User {
  constructor(

    public user_id: number,
    public user_name: string,
    public user_picture: string,
    public user_cover: string
  ){}
  }
  @Injectable()
  export class ProfileService {

    endpoint = 'https://ggs.tv/api/v1/profile.php?user_id=${userId}';
  profile = [];
    httpOptions = {
      headers: new HttpHeaders({'x-auth-token':JSON.stringify(localStorage.getItem('token'))})
    };
    data: any;
  
    constructor(private httpClient: HttpClient) {
     }
  
    async fetchProfile(user_id: string) {
        const response = await this.httpClient.get(`https://ggs.tv/api/v1/profile/${user_id}`);
        console.log(response);    
         }
  }