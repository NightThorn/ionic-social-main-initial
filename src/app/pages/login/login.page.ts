import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { emailValidator } from 'src/app/validators/email.validators';
import { passwordValidator } from 'src/app/validators/password.validator';
import { Toast } from '@capacitor/core';
import { async } from 'rxjs';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage-angular';
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
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: Storage,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private accsPrvds: AccessProviders,
    private alertController: AlertController,
    public loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, emailValidator]],
      password: [null, [Validators.required, passwordValidator]],
    });
  }

  async signIn() {
    await this.storage.create();

    const loading = await this.loadingController.create();
    await loading.present();
    
    return new Promise(resolve=>{

      let body = {
            user_email: this.email,
            user_password: this.password

      }
      console.log(body);
    this.accsPrvds.postData(body, 'applogin.php').subscribe( async (res:any)=>{
      if(res['success'] === true) {
        loading.dismiss();  
        localStorage.setItem('token', res['message']['token']);
        localStorage.setItem('user_id', res['message']['id']);

        console.log(res);      
        this.router.navigateByUrl('/tabs/explore', { replaceUrl: true });
      }
      else{
        loading.dismiss();
        this.presentToast(res.message);

      
      }
    });

  })
}
async presentToast(a){
  const toast = await this.toastCtrl.create({
    message: a,
    duration: 1500,
    position: 'top'
  });
  toast.present();
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


