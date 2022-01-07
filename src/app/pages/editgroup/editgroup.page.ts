import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.page.html',
  styleUrls: ['./editgroup.page.scss'],
})
export class EditgroupPage implements OnInit {

  postForm: FormGroup;
  activeStoredUserSubscription$;
  me: number;
  @Input() group_id: number;
  @Input() group_name: string;
  @Input() group_title: string;
  @Input() group_description: string;
  @Input() group_cover: string;
  @Input() group_admin: number;
  @Input() group_picture: Date;
  @Input() group_privacy: number;



  constructor(private modalController: ModalController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {

        this.me = storedUser.UserID;

      }

    })
    this.postForm = this.fb.group({
      group_id: [this.group_id],
      group_cover: [this.group_cover],
      group_title: [this.group_title],
      group_description: [this.group_description],
      group_picture: [this.group_picture],
      group_admin: [this.group_admin],
      group_name: [this.group_name],
      group_privacy: [this.group_privacy]

    });
  }

  post(message) {
    let data = {
      "group_id": message.group_id,
      "group_cover": message.group_cover,
      "group_title": message.group_title,
      "group_name": message.group_name,
      "group_picture": message.group_picture,
      "group_privacy": message.group_privacy,
      "group_description": message.group_description,
      "group_admin": message.group_admin


    };
    this.http.post('https://ggs.tv/api/v1/group.php?action=edit', JSON.stringify(data)).subscribe(res => {
    });

    this.closeModal();
    window.location.reload();
  }
  closeModal() {
    this.modalController.dismiss();

  }

}
