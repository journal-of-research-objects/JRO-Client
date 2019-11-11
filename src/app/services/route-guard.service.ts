import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UtilityService} from './utility.service';
import {AuthService} from './auth.service';
import {StorageService} from './storage.service';

@Injectable()
export class RouteGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthService,
                private storage: StorageService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;
        this.storage.write('redirect', url);

        return this.checkLogin(url);
    }
    
    checkLogin(url: string) {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}
