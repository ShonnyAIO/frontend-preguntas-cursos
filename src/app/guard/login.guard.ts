import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): Observable<boolean> | boolean {

    if(localStorage.getItem('session')){
      this.router.navigate(['/preguntas']);
      return false;
    }
    return true;
  }
  
}
