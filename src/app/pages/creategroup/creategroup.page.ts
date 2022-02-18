import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-creategroup',
  templateUrl: './creategroup.page.html',
  styleUrls: ['./creategroup.page.scss'],
})
export class CreategroupPage implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();
  imgFile: string;

  postForm: FormGroup;


  @Input() admin: number;

  private file: File;


  constructor(private modalController: ModalController, private alertController: AlertController, private authService: AuthenticationService, private http: HttpClient, private fb: FormBuilder) {
  }

  ngOnInit() {
    console.log(this.admin);
    this.postForm = this.fb.group({
      group_cover: [''],
      group_title: [''],
      group_description: [''],
      group_picture: [''],
      group_name: [''],
      group_privacy: [''],
      group_tag: [''],
      group_category: ['']



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
      "group_admin": this.admin,
      "group_tag": message.group_tag,
      "category": message.group_category




    };
    this.http.post('https://ggs.tv/api/v1/group.php?action=create', JSON.stringify(data)).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.presentAlert();

      this.closeModal();
      window.location.reload();

    });

  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  closeModal() {
    this.modalController.dismiss();

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Group Created',
      message: 'Group has been saved!',
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
