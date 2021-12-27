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
import { PopoverPageModule } from './pages/popover/popover.module';
import { ModalPageModule } from './pages/modal/modal.module';
import { InViewportModule } from 'ng-in-viewport';
import { NgxTweetModule } from "ngx-tweet";

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
    ModalPageModule,
    PopoverPageModule,
    AppRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    AccessProviders,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ProfileService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
