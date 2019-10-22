import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService, ReposService, UtilityService } from '../../services';
import { MessageService } from 'primeng/api';
import { RepoDescriptor, User, RepoSubmit } from '../../types';

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

    public repoSubmit: RepoSubmit;
    public showRepoSubmitModal: boolean = false;

    constructor(protected route: ActivatedRoute,
        protected messageService: MessageService,
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

    sortRepos(a: RepoDescriptor, b: RepoDescriptor) {
        const statusA = a.status;
        const statusB = b.status;

        let comparison = 0;
        if (statusA == statusB) {
            comparison = 0;
        } else if (statusA == "initial") {
            comparison = 1;
        } else if (statusA.startsWith("error") && statusB.startsWith("error")) {
            comparison = 0;
        } else if (statusB == "initial") {
            comparison = -1;
        } else if (statusA == "published") {
            comparison = 1;
        } else if (statusB == "published") {
            comparison = -1;
        } else if (statusA == "submitted") {
            comparison = 1;
        } else if (statusB == "submitted") {
            comparison = -1;
        } else if (statusA.startsWith("error")) {
            comparison = 1;
        } else if (statusB.startsWith("error")) {
            comparison = -1;
        } else if (statusA == "forked") {
            comparison = 1;
        } else {
            comparison = -1;
        }

        return comparison;
    }

    getRepos(accessToken: string) {
        this.searching = true;
        this.githubRepos = [];
        this.reposService.getRepos(accessToken).subscribe((repos: Array<RepoDescriptor>) => {
            repos.forEach(repo => {
                this.githubRepos.push(RepoDescriptor.import(repo))
            });
            console.log(this.githubRepos);
            this.githubRepos = this.githubRepos.sort(this.sortRepos)
            console.log(this.githubRepos);
            this.router.navigateByUrl('/submit');
            this.searching = false;
        });
    }

    submit(repo: RepoDescriptor) {
        const user = this.storage.user;
        if (repo && user) {
            this.showRepoSubmitModal = true;
            this.repoSubmit = { name: repo.name, gitUser: repo.properties.owner.login, orcid: user.orcid, authors: [] };
        }
    }

    onConfirm(event: { status: string, data: any }) {
        if (event.status == 'success') {
            setTimeout(() => {
                this.getRepos(this.accessToken);
            }, 1000);
        }
        this.showRepoSubmitModal = false;
        this.notify(this.repoSubmit, event.status == 'success');
    }

    notify(repo, isSuccess: boolean) {
        let message: string;
        let status: string;
        if (isSuccess) {
            status = 'success';
            message = `${repo.name} is in the automatic verification process`;
        } else {
            status = 'error';
            message = `Fail submitting ${repo.name}. Please try it again.`;
        }
        this.sendNotification(status, message);
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
        this.reposService.deleteRepo(repo.properties['forked_url']).subscribe(response => {
            this.sendNotification('success', 'Repository deleted successfully');
            this.getRepos(this.accessToken);
        }, error => {
            this.sendNotification('error', 'Error deleting repository');
        });
    }

    sendNotification(severity: string, detail: string) {
        this.messageService.add({
            key: 'notification',
            severity: severity,
            detail: detail,
            life: 10000
        });
    }
}
