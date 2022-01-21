import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { emailValidator } from 'src/app/validators/email.validators';
import { passwordValidator } from 'src/app/validators/password.validator';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage-angular';
import {AuthenticationService} from "../../services/authentication.service";
import {StoredUser} from "../../models/stored-user";
import { FcmService } from 'src/app/services/fcm.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
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
  ) {}

  ngOnInit() {

    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser:StoredUser) => {
      if(storedUser !== null) {
        this.router.navigate(['tabs/explore']);
      }
    });

    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, emailValidator]],
      password: [null, [Validators.required, passwordValidator]],
    });
  }

  ngOnDestroy() {
    this.activeStoredUserSubscription$.unsubscribe();
  }

  async signIn() {
    await this.storage.create();

    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.doLogin(this.email, this.password).subscribe((data:any) => {
      if(data['code'] !== 200) {
        // error toast
        let msg = '';
        if(data['message'] !== '') {
          msg = data['message'];
        } else if (data['errors'].length > 0) {
          msg = data['errors'][0];
        }

        if(msg !== '') {
          msg = 'Could not log in, please try again';
        }

        this.presentToast(msg);
        loading.dismiss();

        return;
      }

      let userData = data['data']['login'];
      this.authService.updateStoredUser(userData['token'], userData['user_id'], userData['subscribed'], userData['mod'], userData['staff'], userData['banned'], userData['points'], userData['wallet'], userData['user_package'], userData['boosted_posts']);
      this.fcm.getToken(userData['user_id']);
      loading.dismiss();
    });

    // return new Promise(resolve=>{
    //
    //   let body = {
    //         user_email: this.email,
    //         user_password: this.password
    //
    //   }
    //   console.log(body);
    // this.accsPrvds.postData(body, 'applogin.php').subscribe( async (res:any)=>{
    //   if(res['success'] === true) {
    //     loading.dismiss();
    //     localStorage.setItem('token', res['message']['token']);
    //     localStorage.setItem('user_id', res['message']['id']);
    //
    //     console.log(res);
    //     this.router.navigateByUrl('/tabs/explore', { replaceUrl: true });
    //   }
    //   else{
    //     loading.dismiss();
    //     this.presentToast(res.message);
    //
    //
    //   }
    // });
  //})
  }

  async presentToast(a){
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


