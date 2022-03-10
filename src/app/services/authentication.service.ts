import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map, tap, switchMap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';

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
      map((res: any) => res.message),
      switchMap(token => {
        localStorage.setItem("myID", token.id);
        localStorage.setItem("live", token.live);

        return from(Storage.set({ key: TOKEN_KEY, value: token.token }));
      }),

      tap(_ => {
        this.isAuthenticated.next(true);

      })
    )
  }

  doLogin(email, password) {
    return this.http.post(`https://ggs.tv/applogin.php`, {
      email: email,
      password: password
    }).pipe(map((res: any) => {


      return res;
    }),

      filter((res: any) => {

        return true;
      })
    );

  }
  async destroy(): Promise<void> {
    this.isAuthenticated.next(false);
    const fileEntries = await Filesystem.readdir({
      directory: FilesystemDirectory.Cache,
      path: 'CACHED-IMG',
    });
    fileEntries.files.map(async f => {
      await Filesystem.deleteFile({
        directory: FilesystemDirectory.Cache,
        path: `CACHED-IMG/${f}`,
      });
    });
    this.router.navigateByUrl('/login');
    localStorage.removeItem("myID");

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
