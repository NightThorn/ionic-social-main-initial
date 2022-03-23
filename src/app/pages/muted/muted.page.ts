import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-muted',
  templateUrl: './muted.page.html',
  styleUrls: ['./muted.page.scss'],
})
export class MutedPage implements OnInit {
  me: any;
  @Input() id: number;
  muted: any;
  private onDestroy$: Subject<void> = new Subject<void>();


  constructor(private router: Router, private modalController: ModalController, private authService: AuthenticationService, private http: HttpClient, private dataService: DataService, private fb: FormBuilder) {
  }

  ngOnInit() {

    this.me = localStorage.getItem("myID");
    this.dataService.getMuted(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {

      this.muted = res.message;
    });


  }
  user(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/user'], navigationExtras);
    this.closeModal();

  }
  unmute(muted) {
    let data = {
      "user_id": this.me,
      "muted_id": muted
    };
    this.http.post('https://ggs.tv/api/v1/edituser.php?action=unmute', JSON.stringify(data)).subscribe(res => {
    });

    window.location.reload();
  }
  closeModal() {
    this.modalController.dismiss();

  }


  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }

}
