import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.page.html',
  styleUrls: ['./giphy.page.scss'],
})
export class GiphyPage implements OnInit {
  public dataL: Array<object> = [];
  public friends: any = [];
  activatedroute: any;
  data: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  public searchTerm: string = "";
  public items: any;
  private topLimit: number = 15;
  public dataList: any = [];
  giphy: any;

  constructor(private modalController: ModalController, private router: Router, private dataService: DataService, private alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }
  ngOnInit() {

  }
  searchGif(query) {

    this.dataService.giphy(query).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.giphy = res.data;
      console.log(this.giphy);
    });
  }
  choose(gif) {
    this.modalController.dismiss(gif);


  }
  dismissModal() {
    this.modalController.dismiss();

  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }

}
