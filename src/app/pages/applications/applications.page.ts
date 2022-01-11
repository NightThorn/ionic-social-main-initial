import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.page.html',
  styleUrls: ['./applications.page.scss'],
})
export class ApplicationsPage implements OnInit {
  activeStoredUserSubscription$;
  me: number;
  @Input() group_id: number;
  @Input() user_id: number;
  apps: any;




  constructor(private modalController: ModalController, private router: Router, private dataService: DataService, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        this.me = storedUser.UserID;
      }
      this.dataService.getApps(this.group_id).subscribe(res => {

        this.apps = res.message;
        console.log(this.apps);
      });
    });
  }
  closeModal() {
    this.modalController.dismiss();

  }
  accept(user) {
    

  }
  decline(user) {
    

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

}
