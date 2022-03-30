import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AccessProviders } from './providers/access-providers';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ProfileService } from './services/profile.service';
import { InViewportModule } from 'ng-in-viewport';
import { NgxTweetModule } from "ngx-tweet";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { environment } from './../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
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
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    InViewportModule,
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FontAwesomeModule, 
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),],

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
export class AppModule {
    constructor(library: FaIconLibrary) {
      library.addIconPacks(fas, fab, far);
    } }
