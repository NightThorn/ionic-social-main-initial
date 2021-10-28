import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { IonSlides, Platform } from '@ionic/angular';
import { interval, Subject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-story-viewer',
  templateUrl: './story-viewer.page.html',
  styleUrls: ['./story-viewer.page.scss'],
})
export class StoryViewerPage implements OnInit, OnDestroy {
  @ViewChild(IonSlides) slides: IonSlides;

  stories: any;
  currentUserHistoryIndex = 0;
  duration = 0;
  currentHist = 0;

  commentForm: FormGroup;
  progressTime = 0;
  unsubscribe$ = new Subject<void>();
  slideOpts: any;

  constructor(
    private fb: FormBuilder,
    private platform: Platform,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dataService: DataService
  ) {}

  ngOnInit() {
    const position = this.activatedRoute.snapshot.paramMap.get('id');
    this.slideOpts = {
      initialSlide: position,
      allowTouchMove: false,
    };
    this.stories = this.dataService.getHistories();

    this.commentForm = this.fb.group({
      comment: [null],
    });

    if (!this.stories[position].seen) {
      this.currentUserHistoryIndex = this.stories[position].items.findIndex(
        (item: any) => !item.seen
      );
      this.duration = this.stories[position].items[
        this.currentUserHistoryIndex
      ].duration;
    } else {
      this.duration = this.stories[position].items[0].duration;
    }
    this.runStory();
  }

  runStory() {
    interval(100)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (this.progressTime < 1) {
          this.progressTime += 0.1 / this.duration;
        } else {
          this.progressTime = 0;
          this.nextStoryScreen();
        }
      });
  }

  async nextStoryScreen() {
    let activeIndex = await this.slides.getActiveIndex();

    this.stories[activeIndex].items[this.currentUserHistoryIndex].seen = true;
    this.currentUserHistoryIndex++;

    //check if the stories was finished
    if (
      this.currentUserHistoryIndex == this.stories[activeIndex].items.length &&
      activeIndex == this.stories.length - 1
    ) {
      this.stories[activeIndex].seen = true;
      this.stories[activeIndex].items = this.stories[activeIndex].items.map(
        (item) => {
          item.seen = false;
          return item;
        }
      );
      this.close();
    }

    if (
      this.currentUserHistoryIndex == this.stories[activeIndex].items.length
    ) {
      this.currentUserHistoryIndex = 0;
      this.stories[activeIndex].seen = true;
      this.stories[activeIndex].items = this.stories[activeIndex].items.map(
        (item) => {
          item.seen = false;
          return item;
        }
      );
      await this.slides.slideNext();
    }

    activeIndex = await this.slides.getActiveIndex();
    this.duration = this.stories[activeIndex].items[
      this.currentUserHistoryIndex
    ].duration;
  }

  async onClick(event) {
    this.progressTime = 0;
    if (event.clientX < this.platform.width() / 2) {
      let activeIndex = await this.slides.getActiveIndex();

      if (activeIndex == 0 && this.currentUserHistoryIndex == 0) {
        this.currentUserHistoryIndex = 0;
        this.close();
        return;
      }

      if (this.currentUserHistoryIndex > 0) {
        this.currentUserHistoryIndex--;
        this.stories[activeIndex].items[
          this.currentUserHistoryIndex
        ].seen = false;
        activeIndex = await this.slides.getActiveIndex();
        this.duration = this.stories[activeIndex].items[
          this.currentUserHistoryIndex
        ].duration;
        return;
      }

      if (
        this.currentUserHistoryIndex == 0 &&
        this.stories[activeIndex - 1].seen
      ) {
        this.stories[activeIndex - 1].items = this.stories[
          activeIndex - 1
        ].items.map((item) => {
          item.seen = false;
          return item;
        });

        await this.slides.slidePrev();
        activeIndex = await this.slides.getActiveIndex();
        this.duration = this.stories[activeIndex].items[
          this.currentUserHistoryIndex
        ].duration;

        return;
      }

      if (
        this.currentUserHistoryIndex == 0 &&
        !this.stories[activeIndex - 1].seen
      ) {
        this.stories[activeIndex - 1].items[
          this.currentUserHistoryIndex
        ].seen = false;
        await this.slides.slidePrev();

        activeIndex = await this.slides.getActiveIndex();
        this.duration = this.stories[activeIndex].items[
          this.currentUserHistoryIndex
        ].duration;
      }
    } else {
      this.nextStoryScreen();
    }
  }
  
  close() {
    this.dataService.getSeenFirtsHistories();
    this.router.navigate(['/tabs/explore']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submitComment() {}

}
