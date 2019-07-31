import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {CREDENTIALS} from '../../Credentials/credentials';
import {UserService} from '../../Services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    private clientId = 'APP-M29Z8EEBM7HAB10J';
    // private clientId = 'APP-NNXW1QUFSJRHMC0C';
    public routeSubscription: Subscription;


    constructor(protected route: ActivatedRoute,
                protected userService: UserService) {
    }

    ngOnInit() {
        this.routeSubscription = this.route.queryParams.subscribe(params => {
            const code = params.hasOwnProperty('code') ? params.code : null;

            if (code) {
                this.userService.autenticate(code).subscribe(response => {
                    console.log(response);
                });
            }

            console.log(params);
        });
    }

    onLoggedin() {
        const oauthWindow = window.open(`https://orcid.org/oauth/authorize?client_id=${CREDENTIALS.clientId}&response_type=code&scope=/authenticate&redirect_uri=${window.location.href}`, '_self', 'toolbar=no, scrollbars=yes, width=500, height=600, top=500, left=500');
    }
}
