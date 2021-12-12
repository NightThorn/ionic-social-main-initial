import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
})
export class FeedCardComponent implements OnInit {
  @Input() avatar: string;
  @Input() name: string;
  @Input() date: string;
  @Input() type: string;
  @Input() video: string;
  @Input() picture: string;
  @Input() link: string;
  @Input() likes: number;
  @Input() shares: number;

  @Input() text: string;
  @Input() comments: number;
  @Input() separator: boolean;

  imgConfig = {
    spaceBetween: 6,
    slidesPerView: 1,
    centeredSlides: true,
  };

  constructor() {}

  ngOnInit() {}
}
