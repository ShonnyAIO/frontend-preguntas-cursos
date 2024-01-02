import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): Observable<boolean> | boolean {

    if(localStorage.getItem('session')){
      return true;
    }
    this.router.navigate(['/inicio']);
    return false;
  }
  
}
