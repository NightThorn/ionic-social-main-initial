import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';
export const INTRO_KEY = 'intro-seen';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.page.html',
  styleUrls: ['./introduction.page.scss'],
})
export class IntroductionPage implements OnInit {

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  next() {
    this.slides.slideNext();
  }

  async finish() {
    await Storage.set({ key: INTRO_KEY, value: 'true' });
    this.router.navigateByUrl('/login')
  }


}
