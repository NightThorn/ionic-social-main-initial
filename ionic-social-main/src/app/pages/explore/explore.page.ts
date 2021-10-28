import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  articles: unknown;
  users: unknown;
  feeds: unknown;
  stories: unknown;
  follow: unknown;
  events: unknown;

  storiesConfig = {
    initialSlide: 0,
    spaceBetween: 10,
    slidesPerView: 2.8,
  };

  usersConfig = {
    initialSlide: 0,
    spaceBetween: 2,
    slidesPerView: 5,
  };

  followConfig = {
    initialSlide: 0,
    spaceBetween: 10,
    slidesPerView: 2.6,
  };

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit() {
    this.articles = this.dataService.getArticles();
    this.users = this.dataService.getSeenFirtsHistories();
    this.feeds = this.dataService.getFeed();
    this.follow = this.dataService.getFollow();
    this.events = this.dataService.getEvents();
    this.stories = this.dataService.getStories();
  }

  viewStory(index) {
    this.router.navigate(['story', index]);
  }

  navigateToDetail() {
    this.router.navigate(['post-detail']);
  }

  goToNotifications() {
    this.router.navigate(['notifications']);
  }

  eventDetail(item) {
    let navigationExtras: NavigationExtras = {
      state: {
        event: item,
      },
    };
    this.router.navigate(['event-detail'], navigationExtras);
  }
}
