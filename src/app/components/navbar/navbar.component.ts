import {Component, OnInit} from '@angular/core';
import {UtilityService} from '../../services/utility.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    constructor(protected utility: UtilityService,
                protected router: Router) {
    }

    ngOnInit() {
    }

    login() {
        this.utility.loginOrcid();
        // this.router.navigate(['/login']);
    }
}
