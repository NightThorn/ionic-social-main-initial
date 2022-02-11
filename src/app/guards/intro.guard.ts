import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { INTRO_KEY } from '../pages/introduction/introduction.page';
import { Storage } from '@capacitor/storage';
 
@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate  {
  
  constructor(private router: Router) { }

  async canActivate(): Promise<boolean> {
    const hasSeen = await Storage.get({ key: INTRO_KEY }) || null;
    const shouldShow = !hasSeen || !hasSeen.value;
    if (shouldShow) {
      this.router.navigateByUrl('/introduction');
    }

    return !shouldShow;
  }
}