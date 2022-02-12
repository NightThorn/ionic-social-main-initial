import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.page.html',
  styleUrls: ['./editgroup.page.scss'],
})
export class EditgroupPage implements OnInit {
  imgFile: string;

  postForm: FormGroup;
  me: any;
  @Input() group_id: number;
  @Input() group_name: string;
  @Input() group_title: string;
  @Input() group_description: string;
  @Input() group_cover: string;
  @Input() group_admin: number;
  @Input() group_picture: string;
  @Input() group_privacy: string;
  @Input() group_tag: string;

  private file: File;


  constructor(private modalController: ModalController, private alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.me = localStorage.getItem("myID");

    this.postForm = this.fb.group({
      group_id: [this.group_id],
      group_cover: [this.group_cover],
      group_title: [this.group_title],
      group_description: [this.group_description],
      group_picture: [this.group_picture],
      group_name: [this.group_name],
      group_privacy: [this.group_privacy],
      group_tag: [this.group_tag]


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
      "group_tag": message.group_tag



    };
    this.http.post('https://ggs.tv/api/v1/group.php?action=edit', JSON.stringify(data)).subscribe(res => {
      this.presentAlert();

      this.closeModal();
      window.location.reload();

    });

  }
  closeModal() {
    this.modalController.dismiss();

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Group Settings Changed',
      message: 'Settings have been saved!',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  onFileChange(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.postForm.patchValue({
          group_picture: reader.result
        });

      };
    }
  }
  // for video upload  https://www.codegrepper.com/code-examples/html/input+type+file+accept+only+video

  onCoverChange(e) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.postForm.patchValue({
          group_cover: reader.result
        });

      };
    }
  }


}
