import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
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
  activeStoredUserSubscription$;
  me: number;

  constructor(private modalController: ModalController, private http: HttpClient, private authService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {

        this.me = storedUser.UserID;
        this.xpForm = this.fb.group({
          message: [null]
        });
        this.gg = this.xp * .001;
      }
    });
  }
  async dismissModal() {
    await this.modalController.dismiss(close);

  }
  convert(xp) {
    let data = {
      "xp": xp,
    };
    this.http.post('https://ggs.tv/api/v1/xp.php?tab=convert&user=' + this.me, JSON.stringify(data)).subscribe(res => {
    });

    this.dismissModal();
  }
}
