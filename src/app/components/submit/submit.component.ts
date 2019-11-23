import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, interval, pipe } from 'rxjs';
import { StorageService, ReposService, UtilityService } from '../../services';
import { MessageService } from 'primeng/api';
import { RepoDescriptor, User, RepoSubmit } from '../../types';
import { Observable, Subject } from "rxjs-compat";
import { switchMap } from 'rxjs-compat/operator/switchMap';
import { scan } from 'rxjs-compat/operator/scan';
import { takeWhile } from 'rxjs-compat/operator/takeWhile';

@Component({
    selector: 'app-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.scss']
})

export class SubmitComponent implements OnInit, OnDestroy {
    public githubRepos: Array<RepoDescriptor>;
    public routeSubscription: Subscription;
    public searching = false;
    public accessToken: string;
    private interval: number;

    public repoSubmit: RepoSubmit;
    public showRepoSubmitModal: boolean = false;
    public processing: {} = {};
    private scrollToSource: Subject<number> = new Subject<number>();

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
            this.searching = true;
            this.getRepos(this.accessToken);
            this.setGetReposInterval();
        } else {
            this.routeSubscription = this.route.queryParams.subscribe(params => {
                const ghCode = params.hasOwnProperty('code') ? params.code : null;
                if (ghCode) {
                    this.searching = true;
                    this.reposService.loginGithub(ghCode).subscribe(token => {
                        if (token && token['access_token']) {
                            this.storage.write('access_token', token['access_token']);
                            this.accessToken = token['access_token'];
                            this.getRepos(this.accessToken);
                            this.setGetReposInterval();
                        }
                    });

                }
            });
        }
        this.scrollToSource.switchMap(targetYPos => interval(5)
            .scan((acc, curr) => acc - 5, window.pageYOffset)
            .takeWhile(val => val > targetYPos)).subscribe(position => window.scrollTo(0, position));
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    setGetReposInterval() {
        this.interval = setInterval(() => {
            this.getStatusRepos();
            if (this.githubRepos) {
                this.githubRepos.sort(this.sortRepos);
            }
        }, 15000);
    }

    /** order: forked, error, submitted, published, initial */
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

    getStatusRepos() {
        if (this.githubRepos) {
            this.githubRepos.forEach(repo => {
                if (repo.status != 'initial' && repo.status != 'published') {
                    this.reposService.getStatusRepo(repo.url).subscribe((repoStatus: any) => {
                        repo.status = repoStatus.status;
                    });
                    this.router.navigateByUrl('/submit');
                }
            });
        }
    }

    getRepos(accessToken: string) {
        this.reposService.getRepos(accessToken).subscribe((repos: Array<RepoDescriptor>) => {
            let tempRepos = [];
            repos.forEach(repo => {
                let tempRepo = {};
                tempRepo['fork_url'] = repo['html_url'];
                tempRepo['name'] = repo['name'];
                tempRepo['status'] = repo['status'];
                tempRepo['properties'] = repo;
                tempRepo['issueMsg'] = 'Issues';
                tempRepos.push(RepoDescriptor.import(tempRepo))
            });
            this.githubRepos = tempRepos.sort(this.sortRepos);
            console.log(this.githubRepos);
            this.router.navigateByUrl('/submit');
            this.searching = false;
        });
    }

    submit(repo: RepoDescriptor) {
        const user = this.storage.user;
        if (repo && user) {
            this.showRepoSubmitModal = true;
            this.repoSubmit = {
                name: repo.name, gitUser: repo.properties.owner.login,
                orcid: user.orcid, authors: [], paper_type: 'notebook'
            };
        }
    }

    onConfirm(event: { status: string, data: any }) {
        this.scrollTop();
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
        this.processing[repo.id] = true;
        this.reposService.deleteRepo(repo.properties['forked_url']).subscribe(response => {
            this.sendNotification('success', 'Repository deleted successfully');
            this.getRepos(this.accessToken);
            this.processing[repo.id] = false;
        }, error => {
            if ('error' in error && 'status' in error) {
                console.log(error.error.status);
                if (error.error.status == 'Error while deleting db record') {
                    this.sendNotification('error', 'Error deleting repository')
                } else {
                    this.sendNotification('success', 'Repository deleted successfully');
                    this.getRepos(this.accessToken);;
                }
            } else {
                this.sendNotification('error', 'Error deleting repository');
            }
            this.processing[repo.id] = false;
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

    scrollTop() {
        this.scrollToSource.next(0);
    }
}
