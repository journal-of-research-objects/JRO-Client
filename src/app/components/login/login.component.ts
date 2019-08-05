import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserService, StorageService} from '../../services';
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
                protected router: Router) {
    }

    ngOnInit() {
        if (this.storageService.read('isLoggedIn')) {
            this.router.navigate(['/submit']);
        } else {
            this.routeSubscription = this.route.queryParams.subscribe(params => {
                const code = params.hasOwnProperty('code') ? params.code : null;

                if (code) {
                    this.userService.autenticate(code).subscribe(response => {
                        if (response.access_token) {
                            this.storageService.write('user', response);
                            this.storageService.write('isLoggedIn', 'true');
                            this.router.navigate(['/submit']);
                        }
                    });
                } else {
                    this.utilityService.loginOrcid();
                }
            });
        }
    }
}
