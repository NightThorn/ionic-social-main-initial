import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.page.html',
  styleUrls: ['./tournament-details.page.scss'],
})

export class TournamentDetailsPage implements OnInit {

  data: any;
  events: any;

  constructor(private route: ActivatedRoute, private dataService: DataService,
    private router: Router) { 
    
  }
  ngOnInit() {
    this.events = this.dataService.getEvents();

  }

}
