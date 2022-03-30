import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class EditPage implements OnInit, OnDestroy {
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
  @Input() activision: string;
  @Input() battle: string;
  @Input() discord: string;
  @Input() epic: string;
  @Input() facebook: string;
  @Input() instagram: string;
  @Input() origin: string;
  @Input() playstation: string;
  @Input() steam: string;
  @Input() nswitch: string;
  @Input() tiktok: string;
  @Input() trovo: string;
  @Input() twitch: string;
  @Input() twitter: string;
  @Input() xbox: string;
  @Input() youtube: string;
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
      activision: [this.activision],
      battle: [this.battle],
      discord: [this.discord],
      epic: [this.epic],
      facebook: [this.facebook],
      instagram: [this.instagram],
      origin: [this.origin],
      playstation: [this.playstation],
      steam: [this.steam],
      nswitch: [this.nswitch],
      tiktok: [this.tiktok],
      trovo: [this.trovo],
      twitch: [this.twitch],
      twitter: [this.twitter],
      xbox: [this.xbox],
      youtube: [this.youtube],
     

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
      "searching": message.searching,
      'activision': message.activision,
      'battle': message.battle,
      'discord': message.discord,
      'epic': message.epic,
      'facebook': message.facebook,
      'instagram': message.instagram,
      'origin': message.origin,
      'playstation': message.playstation,
      'steam': message.steam,
      'nswitch': message.nswitch,
      'tiktok': message.tiktok,
      'trovo': message.trovo,
      'twitch': message.twitch,
      'twitter': message.twitter,
      'xbox': message.xbox,
      'youtube': message.youtube
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
