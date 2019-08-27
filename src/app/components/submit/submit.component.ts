import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {StorageService, ReposService, UtilityService} from '../../services';
import {MessageService} from 'primeng/api';
import {RepoDescriptor} from '../../types';

@Component({
    selector: 'app-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.scss']
})

export class SubmitComponent implements OnInit {
    public githubRepos: Array<RepoDescriptor>;
    public routeSubscription: Subscription;
    public searching = false;
    public accessToken;
    // public githubURL = 'https://github.com/login/oauth/authorize?scope=user:email&client_id=' + CREDENTIALS.ghClientId;


    constructor(protected route: ActivatedRoute,
                protected  messageService: MessageService,
                private reposService: ReposService,
                protected router: Router,
                protected utilityService: UtilityService,
                protected storage: StorageService) {
    }

    ngOnInit() {
        this.accessToken = <string>this.storage.read('access_token');
        console.log(this.accessToken);
        if (this.accessToken) {
            this.getRepos(this.accessToken);
        } else {
            this.routeSubscription = this.route.queryParams.subscribe(params => {
                const ghCode = params.hasOwnProperty('code') ? params.code : null;
                if (ghCode) {
                    this.loginGithub(ghCode);
                    // this.storage.write('gh_code', ghCode);
                    // this.getRepos(ghCode);

                }
            });
        }
    }

    loginGithub(code: string) {
        this.reposService.loginGithub(code).subscribe(token => {
            console.log('token', token);
            if (token && token['access_token']) {
                this.storage.write('access_token', token['access_token']);
                this.accessToken = token['access_token'];
                this.getRepos(this.accessToken);
            }
        })
    }

    getRepos(accessToken: string) {
        this.searching = true;
        this.githubRepos = [];
        this.reposService.getRepos(accessToken).subscribe(repos => {
            repos.forEach(repo => {
                this.githubRepos.push(RepoDescriptor.import(repo))
            });
            console.log(this.githubRepos);
            this.router.navigateByUrl('/submit');
            this.searching = false;
        });
    }

    submit(repo: RepoDescriptor) {
        console.log('repo', repo);
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

    onConfirm(repo: RepoDescriptor) {
        const user = <User>this.storage.read('user');
        console.log(repo);
        if (repo && user) {
            this.closeConfirmation();
            this.reposService.submitRepo(repo.name, repo.properties.owner.login, user.orcid).subscribe(response => {
                console.log(response);
                setTimeout(() => { // TODO: Delete this line
                    this.notify(repo, true);
                    this.getRepos(this.accessToken);
                }, 500)
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

    checkButtonAction(state: string): boolean {
        let isSubmittable = false;
        if (state === 'initial') {
            isSubmittable = true;
        }
        return isSubmittable;
    }

    buttonAction(repo: RepoDescriptor) {
        if (this.checkButtonAction(repo.status)) {
            this.submit(repo);
        } else {
            this.deleteRepo(repo);
        }
    }

    deleteRepo(repo: RepoDescriptor) {
        this.reposService.deleteRepo(repo.properties['forked_url']).subscribe( response => {
            this.messageService.add({
                key: 'notification',
                severity: 'success',
                detail: 'Repository deleted successfully',
            });
            this.getRepos(this.accessToken);
        })
    }
}
