import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { emailValidator } from 'src/app/validators/email.validators';
import { passwordValidator } from 'src/app/validators/password.validator';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage-angular';
import { StoredUser } from "../../models/stored-user";
import { FcmService } from 'src/app/services/fcm.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading: any;

  background = {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80)',
  };
  alert: any;
  toastctrl: any;
  email: any;
  password: any;
  accessProviders: any;

  activeStoredUserSubscription$;
  token: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: Storage,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private accsPrvds: AccessProviders,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private authService: AuthenticationService,
    private fcm: FcmService
  ) { }

  ngOnInit() {



    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, emailValidator]],
      password: [null, [Validators.required, passwordValidator]],
    });

    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        console.log("hmmmm");
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        this.token = token.value;
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
      }
    );

  }

  

  async signIn() {
    let loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    this.authService.signIn(this.loginForm.value).subscribe(user => {
      loading.dismiss();
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    },
      async err => {
        loading.dismiss();

        let alert = await this.alertCtrl.create({
          header: 'Error',
          message: err.message,
          buttons: ['OK']
        });
        alert.present();
      })
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
  goToRegister() {

    this.router.navigate(['/register']);

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



  async sendPasswordReset() {
    const alert = await this.alertCtrl.create({
      header: 'Reset Password',
      message: 'Please enter your email to reset your password',
      inputs: [
        {
          name: 'email',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Reset',
          handler: (data) => {
            this.authService.sendPasswordReset(data.email).subscribe(async () => {
              let alert = await this.alertCtrl.create({
                header: 'Success',
                message: 'Check your emails to complete your password reset!',
                buttons: ['OK']
              });
              alert.present();
            });
          }
        }
      ]
    });
    await alert.present();
  }

}


