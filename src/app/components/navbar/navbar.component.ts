import {Component, OnChanges, OnInit} from '@angular/core';
import {UtilityService} from '../../services/utility.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    public isLoggedIn: boolean;
    constructor(protected utility: UtilityService,
                protected router: Router,
                protected authService: AuthService) {
    }

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn();
    }


    login() {
        this.utility.loginOrcid();
        // this.router.navigate(['/login']);
    }

    logOutPage() {
        this.authService.logOut();
        // this.utility.logOutOrcid();
        this.isLoggedIn = this.authService.isLoggedIn();
        this.router.navigate(['']);
    }
}
