import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.page.html',
  styleUrls: ['./applications.page.scss'],
})
export class ApplicationsPage implements OnInit, OnDestroy {
  me: any;
  @Input() group_id: number;
  @Input() user_id: number;
  apps: any;
  private onDestroy$: Subject<void> = new Subject<void>();
  Accept = "Accept";
  Decline = "Decline";


  constructor(private modalController: ModalController, private router: Router, private dataService: DataService, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.me = localStorage.getItem("myID");

    this.dataService.getApps(this.group_id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      this.apps = res.message;
      console.log(this.apps);
    });
  }
  closeModal() {
    this.modalController.dismiss();

  }
  approve(user) {
    let data = {
      "userid": user,
    };
    this.http.post('https://ggs.tv/api/v1/group.php?action=approve&group=' + this.group_id, JSON.stringify(data)).subscribe(res => {
    });
  }
  decline(user) {
    let data = {
      "userid": user,
    };
    this.Decline = "Declined";

    this.http.post('https://ggs.tv/api/v1/group.php?action=decline&group=' + this.group_id, JSON.stringify(data)).subscribe(res => {
    });
  }
  accept(user) {
    let data = {
      "userid": user,
    };
    this.Accept = "Accepted";
    this.http.post('https://ggs.tv/api/v1/group.php?action=accept&group=' + this.group_id, JSON.stringify(data)).subscribe(res => {

    });
  }
  applicant(user, group) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(user),
        group: JSON.stringify(group)
      }
    };
    this.closeModal();

    this.router.navigate(['applicant'], navigationExtras);

  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
