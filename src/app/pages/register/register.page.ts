import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { emailValidator } from 'src/app/validators/email.validators';
import { passwordValidator } from 'src/app/validators/password.validator';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
user_name: string = "";
user_email: string = "";
user_password: string = "";
user_password_confirm: string = "";
code: string = "";
groupcode: string = "";

disabledButton;

  background = {
    backgroundImage:
      'url(https://cdn.nextgov.com/media/img/upload/2019/04/08/NGoverwatch20190408/860x394.jpg)',
  };

  loading: any;
  AccessProviders: any;

  constructor(
    private accsPrvds: AccessProviders,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, emailValidator]],
      phone: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: [null, [Validators.required, passwordValidator]],
      code: null,
      groupcode: null
    });
  }

  async signUp() {
    const loading = await this.loading.create({ message: 'Registering...' });
    await loading.present();
    this.AccessProviders.register(this.registerForm.value).subscribe(
      // If success
      async () => {
        const toast = await this.toastCtrl.create({ message: 'User Created', duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
        this.registerForm.reset();
      },
      // If there is an error
      async () => {
        const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    );
  }

  goBack() {
    this.router.navigate(['/welcome']);
  }

ionViewDidEnter(){

this.disabledButton = false;

}
async tryRegister(){

if(this.user_name==""){
  this.presentToast('User Name is required');
}else if(this.user_email==""){
  this.presentToast('Email is required');
}else if(this.user_password_confirm!=this.user_password){
  this.presentToast('Passwords do not match');
} else{

  this.disabledButton = true;
  const loader = await this.loadingController.create({

    message: 'Creating account...',
  });
  loader.present();
  return new Promise(resolve =>{

    let body = {
      user_name: this.user_name,
      user_email: this.user_email,
      user_password: this.user_password,
      code: this.code,
      groupcode: this.groupcode

    }

    this.accsPrvds.postData(body, 'appregister.php').subscribe((res:any)=>{
      if(res.success==true){
        loader.dismiss();
        this.disabledButton = false;
        this.presentToast(res.message);
        this.router.navigate(['/login']);
      } else{

        loader.dismiss();
        this.disabledButton = false;
        this.presentToast(res.message);

      }
    })
  });
}

}

async presentToast(a){
const toast = await this.toastCtrl.create({
  message: a,
  duration: 1500,
  position: 'top'
});
toast.present();
}



  async presentLoading() {
    this.loading = await this.loadingController.create({
      message:
        '<span class="loader"><span class="loader-inner"></span></span> <p>Loading</p>',
      duration: 2000,
      spinner: null,
    });
    await this.loading.present();
  }
}
