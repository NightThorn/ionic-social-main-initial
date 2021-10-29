import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthenticationService, private router: Router){}
  
  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      map(isAuthenticated => {
console.log('GUARD: ', isAuthenticated);
if (isAuthenticated) {

return true;

} else {

  this.router.navigateByUrl('/login')
  return false;
}

      })
    )

  }
   
}
