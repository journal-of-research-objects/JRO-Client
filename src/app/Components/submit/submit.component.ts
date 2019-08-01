import {Component, ElementRef, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable, Subscription, fromEvent} from 'rxjs';
import {CREDENTIALS} from '../../Credentials/credentials';
import {SubmitService} from '../../Services/submit.service';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.scss'],
    providers: [SubmitService]
})

export class SubmitComponent implements OnInit {
    public githubRepos: Array<any>;
    public routeSubscription: Subscription;
    public searching = false;
    public githubURL = 'https://github.com/login/oauth/authorize?scope=user:email&client_id=' + CREDENTIALS.ghClientId;
    // public githubURL = 'https://github.com/login/oauth/authorize';


    constructor(protected route: ActivatedRoute,
                protected  messageService: MessageService,
                private submitService: SubmitService,
                public router: Router) {
    }

    ngOnInit() {
        this.routeSubscription = this.route.queryParams.subscribe(params => {
            const code = params.hasOwnProperty('code') ? params.code : null;

            if (code) {
                this.searching = true;
                this.submitService.getRepos(code).subscribe(repos => {
                    console.log(repos);
                    this.githubRepos = repos;
                    this.router.navigateByUrl('/submit');
                    this.searching = false;
                });
            }

            console.log(params);
        });
    }

    fork(repo) {
        if (repo) {
            this.messageService.add({
                key: 'confirmFork',
                severity: 'info',
                summary: 'Fork Repo',
                detail: `Are you sure you want clone the repo ${repo.name}?`,
                sticky: true,
                data: repo
            });
        }
    }

    onConfirm(repo) {
        if (repo) {
            this.closeConfirmation();
            this.submitService.forkRepo(repo.clone_url).subscribe(response => {
                console.log(response);
                this.notify(repo, true);
            }, error => {
                console.log('error', error);
                this.notify(repo, false);
            });
        }
    }

    notify(repo, isSuccess: boolean) {
        let message: string;
        let status: string;
        if (isSuccess) {
            status = 'success';
            message = `Fork of ${repo.name} created successfully`;
        } else {
            status = 'error';
            message = `Fail creating fork of ${repo.name}`;
        }
        this.messageService.add({
            key: 'notification',
            severity: status,
            detail: message,
        });
    }

    closeConfirmation() {
        this.messageService.clear('confirmFork');
    }
}
