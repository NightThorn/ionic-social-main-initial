import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
})
export class GroupCardComponent implements OnInit {

  @Input() image: string;
  @Input() name: string;
  @Input() members: number;
  @Input() description: string;
  @Input() verified: string;
  @Input() cover: string;

  constructor() { }

  ngOnInit() {}

}
