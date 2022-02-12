import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sharemodal',
  templateUrl: './sharemodal.page.html',
  styleUrls: ['./sharemodal.page.scss'],
})
export class SharemodalPage implements OnInit {
  @Input() id: number;

  postForm: FormGroup;
  me: any;
  imgFile: string;
  videoFile: string;
  gif: string;
  share: any;


  constructor(private modalController: ModalController, private dataService: DataService, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.me = localStorage.getItem("myID");

      this.dataService.getPostDetails(this.id).subscribe(res => {
        this.share = res.message;
      });
      this.postForm = this.fb.group({
        text: [null],

      });
  }

  post(user, text) {
    let time = new Date(Date.now());
    let data = {
      "user_id": user,
      "message": text,
      "post_id": this.id,
      "time": time,


    };
    this.http.post('https://ggs.tv/api/v1/post.php?action=share', JSON.stringify(data)).subscribe(res => {
    });

    this.closeModal();
  }
  closeModal() {
    this.modalController.dismiss();

  }
  

}