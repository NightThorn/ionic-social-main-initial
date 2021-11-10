import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import 'rxjs-compat/add/operator/timeout';
import 'rxjs-compat/add/operator/map';
import {BehaviorSubject} from "rxjs";
import {Storage} from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  key_token = 'auth_token';
  key_user_id = 'auth_user_id';

  private _storage:Storage;

  activeToken: BehaviorSubject<string> = new BehaviorSubject<string>("");
  activeUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  server: string = 'https://ggs.tv/api/v1/';

  constructor(
    public http: HttpClient,
    public storage: Storage
  ) {
    this.init();
  }

  async init() {
      this._storage = await this.storage.create();
      this.reload();
  }

  async reload() {
    console.log("Reload");

    let token:string = await this._storage.get(this.key_token);
    let userId:number = await this._storage.get(this.key_user_id);

    console.log("Reload:Token: ", token);
    console.log("Reload:UserId: ", userId);

    if(token !== this.activeToken.getValue()) {
      console.log("Reload:NewToken");
      this.activeToken.next( token );
      this.activeUserId.next( userId );
    }
  }

  async updateToken(token:string) {
    await this.storage.set(this.key_token, token);
    this.reload();
  }

  async updateUserId(userId:number) {
    await this.storage.set(this.key_user_id,userId);
    this.reload();
  }

  doLogin(email, password) {
    return this.http.post(this.server + "/auth/login", {
      user_email: email,
      user_password: password
    })
  }

}
