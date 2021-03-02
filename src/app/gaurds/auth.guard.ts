import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((res, rej) => {
      if (!localStorage.getItem(environment.loginDataKey)) {
        res(true);
      } else {
        this.router.navigateByUrl("/", { replaceUrl: true });
        res(false);
      }
    })
  }
}
