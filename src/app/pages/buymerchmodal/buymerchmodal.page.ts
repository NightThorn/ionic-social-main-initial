import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-buymerchmodal',
  templateUrl: './buymerchmodal.page.html',
  styleUrls: ['./buymerchmodal.page.scss'],
})
export class BuymerchmodalPage implements OnInit {
  @Input() id: number;
  postForm: FormGroup;
  activeStoredUserSubscription$;
  me: number;
  merchItem: any;

  constructor(private modalController: ModalController, private dataService: DataService, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      console.log("PROFILEPAGE:ACTIVE_USER_SUB:TOKEN", storedUser.Token);
      console.log("PROFILEPAGE:ACTIVE_USER_SUB:ID", storedUser.UserID);
      this.me = storedUser.UserID;


      this.dataService.getMerchItem(this.id).subscribe(res => {
        this.merchItem = res.message;
      });
    });
    this.postForm = this.fb.group({
      name: [null],
      street: [null],
      city: [null],
      state: [null],
      zip: [null],
      size: [null],
    });
  }

  post(me, value) {
    let data = {
      "user_id": me,
      "price": this.merchItem[0]['price'],
      "item": this.merchItem[0]['id'],
      "name": value.name,
      "street": value.street,
      "city": value.city,
      "state": value.state,
      "zip": value.zip,
      "size": value.size,

    };
    console.log(data);

    this.http.post('https://ggs.tv/api/v1/buymerch.php?action=buy&item=' + data.item, JSON.stringify(data)).subscribe(res => {
      console.log(res);
    });

    this.closeModal();
  }
  closeModal() {
    this.modalController.dismiss();

  }
}
