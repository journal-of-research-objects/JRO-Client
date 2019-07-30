import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {CREDENTIALS} from '../../Credentials/credentials';
import {SubmitService} from '../../Services/submit.service';

@Component({
    selector: 'app-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.scss'],
    providers: [SubmitService]
})

export class SubmitComponent implements OnInit {
    public githubRepos: Array <any>;
    public routeSubscription: Subscription;
    public searching: boolean = true;
    public githubURL = "https://github.com/login/oauth/authorize?scope=user:email&client_id=" + CREDENTIALS.ghClientId;


    constructor(protected route: ActivatedRoute,
        private submitService: SubmitService,
        public router: Router) {
    }

    ngOnInit() {
        this.routeSubscription = this.route.queryParams.subscribe(params => {
            const code = params.hasOwnProperty('code') ? params.code : null;

            if (code) {
                    this.submitService.getRepos(code).subscribe(repos => {
                    console.log(repos);
                    this.githubRepos = repos;//.json() as Array<any>;
                    this.router.navigateByUrl('/submit');
                    this.searching = false;
                });
            }

            console.log(params);
        });
    }

}
