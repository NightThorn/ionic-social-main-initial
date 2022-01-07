import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.page.html',
  styleUrls: ['./tournament-details.page.scss'],
})

export class TournamentDetailsPage implements OnInit {

  data: any;
  events: any;
  tournaments: any;
  me: any;
  activeStoredUserSubscription$: any;
  tournamentpic: any;
  tournamentinfo: any;
  tournamentrules: any;
  tournamenttitle: any;
  tournamentprice: any;
  tournamentjoin: any;
  tournamentschedule: any;
  iJoined = false;

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private http: HttpClient, private dataService: DataService,
    private router: Router) { 
    
  }
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
    this.activeStoredUserSubscription$ = this.authService.activeStoredUser.subscribe((storedUser: StoredUser) => {
      if (storedUser !== null) {
        this.me = storedUser.UserID;
      
    
        this.dataService.getTournamentDetails(this.data).subscribe(res => {
          this.tournaments = res.message;
          this.tournamentpic = this.tournaments[0]['thumbnail'];
          this.tournamentinfo = this.tournaments[0]['about'];
          this.tournamentrules = this.tournaments[0]['rules'];
          this.tournamenttitle = this.tournaments[0]['title'];
          this.tournamentprice = this.tournaments[0]['price'];
          this.tournamentjoin = this.tournaments[0]['join_cost'];
          this.tournamentschedule = this.tournaments[0]['schedule'];
          let data = this.tournaments.find(message => message['user_id'] == this.me);
          console.log(data);
          if (data) {
            this.iJoined = true;
          } else {
            this.iJoined = false;
          }

        });
      }
    });

  }
  user(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['user'], navigationExtras)

  }
  register(id) {
      let data = {
        
      };


        this.http.post('https://ggs.tv/api/v1/tournaments.php?view=register&id=' + id + '&user=' + this.me, JSON.stringify(data)).subscribe(res => {
          window.location.reload();
        });
}
}
