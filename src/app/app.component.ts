import {Component, OnInit} from '@angular/core';
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private storage: Storage
  ) {}

  async ngOnInit() {
    // initialize storage right away because why not
    await this.storage.create();
  }
}
