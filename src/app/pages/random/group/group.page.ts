import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  group: any;
  tabType = 'posts';

  constructor(private dataService: DataService, private router: Router, public loadingController: LoadingController, private auth: AuthenticationService) { }

  ngOnInit() {
    this.dataService.getRandomGroup().subscribe(res => {
      this.group = res.message;
     
    })
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.dataService.getRandomGroup().subscribe(res => {
      this.group = res.message;

    });
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
  



  

  user(id) {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/group/'], navigationExtras);

  }
  

}
