import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, IonInput, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { passwordValidator } from 'src/app/validators/password.validator';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  loading: any;
  alert: any;
  toastctrl: any;
  new_password: string = "";
  new_password_confirm: string = "";

  activeStoredUserSubscription$;
  me: number;
  @Input() id: number;
  blocked: any;
  postForm: FormGroup;
  showPassword = false;
  passwordToggleIcon = 'eye';
  constructor(private toastCtrl: ToastController,
    public loadingController: LoadingController, private router: Router, public alertController: AlertController, private modalController: ModalController, private authService: AuthenticationService, private http: HttpClient, private dataService: DataService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {

        this.me = storedUser.UserID;

      }

      this.postForm = this.fb.group({
        old: [null],

        new: [null, [Validators.required, passwordValidator]],

        repeat: [null, [Validators.required, passwordValidator]],



      });
    });

  }
  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye') {

      this.passwordToggleIcon = 'eye-off';
    } else {

      this.passwordToggleIcon = 'eye';
    }
  }

  change(blocked) {
    if (this.new_password != this.new_password_confirm) {

      this.presentAlert();
    } else {
      let data = {
        "user_id": this.me,
        "old": blocked.old,
        "new": blocked.new,
        "repeat": blocked.repeat
      };
      this.http.post('https://ggs.tv/api/v1/password.php?action=change', JSON.stringify(data)).subscribe(res => {
        // error toast
        if (res['msg'] == "Old password incorrect") {
          this.presentToast("Old Password Incorrect");
        } else {
          this.presentSuccess();
          this.postForm.reset();
          this.logout();
        }


      });

    }
  }
  closeModal() {
    this.modalController.dismiss();

  }
  async logout() {
    await this.authService.destroy();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
  async presentSuccess() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Password Changed',
      message: 'Password has been changed',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Password Mismatch',
      message: 'Passwords must match',
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }

  goBack() {
    this.router.navigate(['/welcome']);
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'loader-container',
      message:
        '<span class="loader"><span class="loader-inner"></span></span><p class="loader-text">Loading</p>',
      duration: 2000,
      spinner: null,
    });
    await this.loading.present();
  }
}

