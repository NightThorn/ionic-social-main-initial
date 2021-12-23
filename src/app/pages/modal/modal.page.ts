import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  postForm: FormGroup;
  activeStoredUserSubscription$;
  me: number;

  constructor(private modalController: ModalController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:TOKEN", storedUser.Token);
        console.log("PROFILEPAGE:ACTIVE_USER_SUB:ID", storedUser.UserID);
        this.me = storedUser.UserID;

      }
    })
    this.postForm = this.fb.group({
      message: [null]
    });
  }

  post(user, message) {
    let time = new Date(Date.now());
    let data = {
      "user_id": user,
      "message": message,
      "time": time
    };
    this.http.post('https://ggs.tv/api/v1/post.php?action=post', JSON.stringify(data)).subscribe(res => {
      console.log(res);
    });

    this.closeModal();
  }
  closeModal() {
    this.modalController.dismiss();

  }
}
