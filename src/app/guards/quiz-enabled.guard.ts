import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { NavService } from '../services/nav.service';

@Injectable({
  providedIn: 'root',
})
export class QuizEnabledGuard implements CanActivate {
  navService = inject(NavService);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.navService.quizEnabled$;
  }
}
