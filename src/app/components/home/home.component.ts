import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtilityService} from '../../services/utility.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
    constructor(protected router: Router) {
    }

    ngOnInit() {
    }

    goToSubmit() {
        this.router.navigate(['/submit']);
    }

}
