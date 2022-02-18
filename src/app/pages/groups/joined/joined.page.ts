import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoredUser } from 'src/app/models/stored-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-joined',
  templateUrl: './joined.page.html',
  styleUrls: ['./joined.page.scss'],
})
export class JoinedPage implements OnInit, OnDestroy {
  me: any;
  groups: any = [];
  private onDestroy$: Subject<void> = new Subject<void>();
  constructor(private authService: AuthenticationService, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.me = localStorage.getItem("myID");
    this.dataService.getJoinedGroups(this.me).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      this.groups = res.message;


    });

  }
  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }
  goToGroup(id) {





    this.router.navigate(['/group/' + id]);
  }

}

