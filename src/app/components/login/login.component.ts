import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserService, StorageService, AuthService} from '../../services';
import {UtilityService} from '../../services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: []
})

export class LoginComponent implements OnInit {
    public routeSubscription: Subscription;


    constructor(protected route: ActivatedRoute,
                protected userService: UserService,
                protected storageService: StorageService,
                protected utilityService: UtilityService,
                protected router: Router,
                protected authService: AuthService) {
    }

    ngOnInit() {
        if (this.storageService.read('isLoggedIn')) {
            this.redirect();
            // this.router.navigate(['/submit']);
        } else {
            this.routeSubscription = this.route.queryParams.subscribe(params => {
                const code = params.hasOwnProperty('code') ? params.code : null;

                if (code) {
                    this.userService.autenticate(code).subscribe(response => {
                        if (response.access_token) {
                            this.storageService.write('user', response);
                            this.storageService.write('token', response.access_token);
                            // this.router.navigate(['/submit']);
                            this.redirect();
                        }
                    });
                } else {
                    this.utilityService.loginOrcid();
                }
            });
        }
    }

    redirect() {
        let url = this.storageService.read('redirect');
        if (url) {
            this.router.navigate([url])
        } else {
            this.router.navigate([''])
        }
    }
}
