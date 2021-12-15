import { Injectable } from '@angular/core';
import 'rxjs-compat/add/operator/timeout';
import 'rxjs-compat/add/operator/map';
import { BehaviorSubject } from "rxjs";
import { Storage } from "@ionic/storage-angular";
import { StoredUser } from "../models/stored-user";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  key_token = 'auth_token';
  key_user_id = 'auth_user_id';
  key_stored_user = 'auth_stored_user';

  private _storage: Storage;

  activeStoredUser: BehaviorSubject<StoredUser> = new BehaviorSubject<StoredUser>(null);

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

    let storedUser: StoredUser = await this._storage.get(this.key_stored_user);

    console.log("Reload:StoredUser: ", storedUser);

    if ((this.activeStoredUser.getValue() === null) || storedUser.Token !== this.activeStoredUser.getValue().Token) {
      console.log("Reload:NewStoredUser");
      this.activeStoredUser.next(storedUser);
    }
  }

  async updateStoredUser(token: string, userId: number) {
    await this.storage.set(this.key_stored_user, {
      Token: token,
      UserID: userId
    });
    this.reload();
  }

  async destroy() {
    await this.storage.remove(this.key_stored_user);
    this.reload();
  }

  doLogin(email, password) {
    return this.http.post(this.server + "/auth/login", {
      user_email: email,
      user_password: password
    })
  }

  
}