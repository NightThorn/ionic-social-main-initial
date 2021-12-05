import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss'],
})
export class StoryCardComponent implements OnInit {
  @ViewChild('video') myVideo: ElementRef;
  @Input() source: string;
  @Input() avatar: string;
  @Input() name: string;
  @Input() id: number;
  @Input() date: string;
  
  constructor(private router: Router) { }

  ngOnInit() {}
  

  user(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(id)
      }
    };
    this.router.navigate(['/user'], navigationExtras);

  }
}
