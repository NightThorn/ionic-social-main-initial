import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-xpmodal',
  templateUrl: './xpmodal.page.html',
  styleUrls: ['./xpmodal.page.scss'],
})
export class XpmodalPage implements OnInit {
  @Input() xp: number;
  xpForm: FormGroup;
  gg: number;
  me: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  result: Object;

  constructor(private modalController: ModalController, private http: HttpClient, private authService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.me = localStorage.getItem("myID");

    this.xpForm = this.fb.group({
      message: [null]
    });
    this.gg = this.xp * .001;

  }
  async dismiss() {
    await this.modalController.dismiss();
  }
  async dismissModal(result) {
    await this.modalController.dismiss(result);

  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  convert(xp) {
    let data = {
      "xp": xp,
    };
    this.http.post('https://ggs.tv/api/v1/xp.php?tab=convert&user=' + this.me, JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });
    this.result = "good";

    this.dismissModal(this.result);
  }
}
