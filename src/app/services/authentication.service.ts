import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Storage } from '@capacitor/storage';
import { StoredUser } from '../models/stored-user';


const TOKEN_KEY = 'my-token';
const ID_KEY = 'my-id';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  activeStoredUser: BehaviorSubject<StoredUser> = new BehaviorSubject<StoredUser>(null);

  url: string = 'https://ggs.tv/api/v1/';

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  private async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  signIn(credentials: { user_email, user_password }): Observable<any> {
    return this.http.post(`https://ggs.tv/applogin.php`, credentials).pipe(
      map((data: any) => data.message.token),
      switchMap(token => {
        return from(Storage.set({ key: TOKEN_KEY, value: token }));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);

      })
    )
  }

  async destroy(): Promise<void> {
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/login');
    return Storage.remove({ key: TOKEN_KEY });
  }

  signUp(credentials) {
    return this.http.post(`https://ggs.tv/appregister.php`, credentials).pipe(
      map((data: any) => data.token),
      switchMap(token => {
        return from(Storage.set({ key: TOKEN_KEY, value: token }));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  sendPasswordReset(email) {
    // Implement if it exists on your API!
    return this.http.post(`${this.url}/users/pw-reset`, { email });
  }
}
