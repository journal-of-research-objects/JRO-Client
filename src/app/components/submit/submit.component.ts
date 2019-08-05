import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {CREDENTIALS} from '../../credentials/credentials';
import {StorageService, SubmitService, UtilityService} from '../../services';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.scss']
})

export class SubmitComponent implements OnInit {
    public githubRepos: Array<any>;
    public routeSubscription: Subscription;
    public searching = false;
    // public githubURL = 'https://github.com/login/oauth/authorize?scope=user:email&client_id=' + CREDENTIALS.ghClientId;


    constructor(protected route: ActivatedRoute,
                protected  messageService: MessageService,
                private submitService: SubmitService,
                protected router: Router,
                protected utilityService: UtilityService,
                protected storage: StorageService) {
    }

    ngOnInit() {
        // const code = this.storage.read('gh_code');
        // if (code) {
        //     this.getRepos(code);
        // } else {

            this.routeSubscription = this.route.queryParams.subscribe(params => {
                const ghCode = params.hasOwnProperty('code') ? params.code : null;
                if (ghCode) {
                    this.storage.write('gh_code', ghCode);
                    this.getRepos(ghCode);
                }
            });
        // }
    }

    getRepos(code: string) {
        this.searching = true;
        this.submitService.getRepos(code).subscribe(repos => {
            console.log(repos);
            this.githubRepos = repos;
            this.router.navigateByUrl('/submit');
            this.searching = false;
        });
    }

    fork(repo) {
        if (repo) {
            this.messageService.add({
                key: 'confirmFork',
                severity: 'info',
                summary: 'Submit Repo',
                detail: `Are you sure you want submit the repo ${repo.name}?`,
                sticky: true,
                data: repo
            });
        }
    }

    onConfirm(repo) {
        if (repo) {
            this.closeConfirmation();
            this.submitService.forkRepo(repo.forks_url).subscribe(response => {
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
            message = `${repo.name} submitted successfully`;
        } else {
            status = 'error';
            message = `Fail submitting ${repo.name}`;
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

    onLoginGithub() {
        this.utilityService.loginGithub();
    }
}