import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FcmService {

    constructor(private firebase: Firebase,
        private afs: AngularFirestore,
        private platform: Platform) { }

    async getToken(user) {
        let token;
        let ostype;

        if (this.platform.is('android')) {
            ostype = 'android'

            token = await this.firebase.getToken();
        }

        if (this.platform.is('ios')) {
            ostype = 'ios'
            token = await this.firebase.getToken();
            await this.firebase.grantPermission();
        }

        this.saveToken(token, user, ostype);
    }

    async saveToken(token, userid, ostype) {
        if (!token) return;


            $.ajax({
                url: 'https://ggs.tv/savetoken.php',
                type: 'POST',
                async: true,
                data: { sessiontype: 'app', token: token, userid: userid, ostype: ostype },
                success: function (data) {
                    console.log(data); // Inspect this in your console
                }
            });
        
    }

   async removeToken(userid) {
        let token;
        let ostype;
        token = await this.firebase.getToken();
       if (this.platform.is('ios')) {
           ostype = 'ios'
       }
       if (this.platform.is('android')) {
           ostype = 'android'
       }
    $.ajax({
        url: 'savetoken.php',
        type: 'POST',
        async: true,
        data: { sessiontype: 'app', token: token, userid: userid, action: 'delete', ostype: ostype },
        success: function (data) {
            console.log(data); // Inspect this in your console
        }
    });
}
    onNotifications() {
        return this.firebase.onNotificationOpen();
    }
}