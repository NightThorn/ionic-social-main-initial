import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  postForm: FormGroup;
  me: any;

  @Input() id: number;
  @Input() bio: string;
  @Input() location: string;
  @Input() username: string;
  @Input() email: string;
  @Input() gender: number;
  @Input() birthdate: Date;
  @Input() relationship: number;
  @Input() searching: number;
  @Input() current: string;
  private onDestroy$: Subject<void> = new Subject<void>();


  constructor(private modalController: ModalController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.me = localStorage.getItem("myID");




    this.postForm = this.fb.group({
      biography: [this.bio],
      location: [this.location],
      email: [this.email],
      gender: [this.gender],
      relationship: [this.relationship],
      username: [this.username],
      searching: [this.searching],
      birthdate: [this.birthdate],
      current: [this.current],

    });
  }

  post(user, message) {
    let data = {
      "user_id": user,
      "current": message.current,
      "biography": message.biography,
      "location": message.location,
      "email": message.email,
      "gender": message.gender,
      "relationship": message.relationship,
      "username": message.username,
      "searching": message.searching
    };
    this.http.post('https://ggs.tv/api/v1/edituser.php?action=edit', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
    });

    this.closeModal();
    window.location.reload();
  }
  closeModal() {
    this.modalController.dismiss();

  }


  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
