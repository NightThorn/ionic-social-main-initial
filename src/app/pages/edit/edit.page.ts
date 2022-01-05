import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  postForm: FormGroup;
  activeStoredUserSubscription$;
  me: number;
  @Input() id: number;
  @Input() bio: number;
  constructor(private modalController: ModalController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {

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
    });

    this.closeModal();
  }
  closeModal() {
    this.modalController.dismiss();

  }

}
