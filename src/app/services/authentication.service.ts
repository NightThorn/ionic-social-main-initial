import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { StoredUser } from '../models/stored-user';
import { Storage } from '@capacitor/storage';

const TOKEN_KEY = 'my-token';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  id = '';

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


  signIn(credentials: { email, password }): Observable<any> {
    return this.http.post(`https://ggs.tv/applogin.php`, credentials).pipe(
      map((data: any) => data.message),
      switchMap(token => {
        localStorage.setItem("myID", token.id);
        return from(Storage.set({ key: TOKEN_KEY, value: token.token }));
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
    
      let data = {
        "email": email,
        
      };
    return this.http.post('https://ggs.tv/api/v1/password.php?action=change', JSON.stringify(data));
        

    }
}
