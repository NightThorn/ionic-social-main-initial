import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.page.html',
  styleUrls: ['./blocked.page.scss'],
})
export class BlockedPage implements OnInit {
  me: any;
  @Input() id: number;
  blocked: any;
 
  constructor(private router: Router, private modalController: ModalController, private authService: AuthenticationService, private http: HttpClient, private dataService: DataService, private fb: FormBuilder) {
  }

  ngOnInit() {
  
    this.me = localStorage.getItem("myID");
        this.dataService.getBlocked(this.me).subscribe(res => {

          this.blocked = res.message;
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
  unblock(blocked) {
    let data = {
      "user_id": this.me,
      "blocked_id": blocked
    };
    this.http.post('https://ggs.tv/api/v1/edituser.php?action=unblock', JSON.stringify(data)).subscribe(res => {
    });

    window.location.reload();
  }
  closeModal() {
    this.modalController.dismiss();

  }

}
