import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })

export class FcmService {
    private onDestroy$: Subject<void> = new Subject<void>();
    constructor(private firebase: Firebase,
        private platform: Platform, private http: HttpClient) { }

    async getToken(token, user) {
        let ostype;

        if (this.platform.is('android')) {
            ostype = 'android'

        }

        if (this.platform.is('ios')) {
            ostype = 'ios'
        }

        this.saveToken(token, user, ostype);
    }

    async saveToken(token, userid, ostype) {
        if (!token) return;
        let data = {
            sessiontype: 'app', token: token, userid: userid, ostype: ostype
        };


        this.http.post('https://ggs.tv/savetoken.php', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            console.log(res);
        });



    }



    async removeToken(userid, token) {
        let ostype;
        if (this.platform.is('ios')) {
            ostype = 'ios'
        }
        if (this.platform.is('android')) {
            ostype = 'android'
        }
        let data = {
            sessiontype: 'app', token: token, userid: userid, action: 'delete', ostype: ostype
        };


        this.http.post('https://ggs.tv/savetoken.php', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
            console.log(res);
        });
    }
    onNotifications() {
        return this.firebase.onNotificationOpen();
    }
    public ngOnDestroy(): void {
        this.onDestroy$.next();
    }
}