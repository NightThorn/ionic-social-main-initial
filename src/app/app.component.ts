import {Component, OnInit} from '@angular/core';
import {Storage} from "@ionic/storage-angular";
import moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private storage: Storage
  ) {
    moment.locale('en');


  }

  async ngOnInit() {
    // initialize storage right away because why not
    await this.storage.create();
  }
}
