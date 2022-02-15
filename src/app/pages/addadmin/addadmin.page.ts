import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.page.html',
  styleUrls: ['./addadmin.page.scss'],
})
export class AddadminPage implements OnInit {

  me: number;
  @Input() group_id: number;
  joined: any;
  res: any = [];
  public dataL: Array<object> = [];
  public grinders: any = [];
  activatedroute: any;
  data: any;
  public searchTerm: string = "";
  public items: any;
  private topLimit: number = 15;
  public dataList: any = [];
  admins: any;
  private onDestroy$: Subject<void> = new Subject<void>();


  constructor(private modalController: ModalController, private router: Router, private dataService: DataService, private alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.dataService.getGroupMembersNotAdmin(this.group_id).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.admins = res.message;
      this.joined = Array.from({ length: this.admins.length }).fill('Make Admin');

    });
  }
  closeModal() {
    this.modalController.dismiss();

  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  admin(user, index) {
    let data = {
      "user_id": user
    };
    this.joined[index] = 'Added';

    this.http.post('https://ggs.tv/api/v1/groupadmins.php?action=add&group=' + this.group_id, JSON.stringify(data)).subscribe(res => {

    });

  }
}
