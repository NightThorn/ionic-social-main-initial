import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { emailValidator } from 'src/app/validators/email.validators';
import { passwordValidator } from 'src/app/validators/password.validator';
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
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, emailValidator]],
      password: [null, [Validators.required, passwordValidator]],
    });
  }

  async signIn() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.loginForm.value).subscribe(

      async (res) => {

          await loading.dismiss();
          this.router.navigate(['tabs/explore']);

      },
      async (res) => {
          await loading.dismiss();
          const alert = await this.alertController.create({

            header: 'Login Failed',
              message: res.error.error,
              buttons: ['OK'],
                  });
            await alert.present();
      }
    );
  
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
