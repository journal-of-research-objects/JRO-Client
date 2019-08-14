import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UtilityService} from './utility.service';

@Injectable()
export class RouteGuard implements CanActivate {

    constructor(private router: Router,
                private utilityService: UtilityService) {}

    canActivate() {
        if (localStorage.getItem('isLoggedIn')) {
            return true;
        }

        this.router.navigate(['/login']);
        // this.utilityService.loginOrcid();
        return false;
    }
}
