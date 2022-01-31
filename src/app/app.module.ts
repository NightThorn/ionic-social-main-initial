import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AccessProviders } from './providers/access-providers';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ProfileService } from './services/profile.service';
import { ModalPageModule } from './pages/modal/modal.module';
import { InViewportModule } from 'ng-in-viewport';
import { NgxTweetModule } from "ngx-tweet";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { MentionModule } from 'angular-mentions';

const firebaseConfig = {
  apiKey: "AIzaSyCddHyUNEHKoKtqcdlgbhKSQsIjJHtpjIs",
  authDomain: "greasy-gamer-267521.firebaseapp.com",
  projectId: "greasy-gamer-267521",
  storageBucket: "greasy-gamer-267521.appspot.com",
  messagingSenderId: "996502230755",
  appId: "1:996502230755:web:9ee5a09cbdcf0a064197d6",
  measurementId: "G-4YTDY6WE3Z"
};
@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    NgxTweetModule,
    FormsModule,
    MentionModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    InViewportModule,
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule],
  providers: [
    AccessProviders,
    Firebase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ProfileService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
