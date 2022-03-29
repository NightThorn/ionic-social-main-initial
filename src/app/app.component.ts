import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Directory } from '@capacitor/filesystem';
import { Storage } from "@ionic/storage-angular";
import moment from 'moment';
const { Filesystem } = Plugins;
import { SwUpdate } from '@angular/service-worker';
import { ToastController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { DataService } from './services/data.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  challenges: any;
  done: any;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private storage: Storage, private router: Router, private dataService: DataService, private swUpdate: SwUpdate, private toastController: ToastController,


  ) {
    moment.locale('en');
    this.initializeApp();

    this.createCacheFolder();
  }

  async createCacheFolder() {

    await Filesystem.mkdir({

      directory: Directory.Cache,
      path: `CACHED-IMG`
    });
  }
  initializeApp() {
    this.checkSwUpdate();
  }
  async checkSwUpdate() {
    this.swUpdate.available.subscribe(async evt => {
      const toast = await this.toastController.create({
        header: 'New Version available',
        message: 'Click to update',
        position: 'bottom',
        buttons: [
          {
            side: 'end',
            icon: 'star',
            text: 'Update',
            handler: () => {
              window.location.reload();
            },
          },
        ],
      });
      toast.present();
    });
  }
  goHome() {
    this.router.navigate(['tabs/explore']);
  }
  goTournaments() {
    this.router.navigate(['tournaments']);
  }
  goGroups() {
    this.router.navigate(['groups']);
  }
  goRandom() {
    this.router.navigate(['random']);
  }
  goShop() {
    this.router.navigate(['shop']);
  }
  async ngOnInit() {
    // initialize storage right away because why not
    await this.storage.create();
    this.dataService.challenges().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.challenges = res.message;

    });
    

  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
