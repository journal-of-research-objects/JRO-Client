import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { RepoDescriptor } from '../../types';
import { ReposService, UtilityService, StorageService, UserService } from '../../services';
import { MessageService, SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-review',
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.scss']
})

export class ReviewComponent implements OnInit, OnDestroy {

    public repos: Array<RepoDescriptor> = [];
    public processing: {} = {};
    public papersFamilies: SelectItem[] = [
        { label: 'All', value: null },
        { label: 'Notebook', value: 'notebook' },
        { label: 'OpenSoft', value: 'opensoft' },
    ];
    private subscriptions: Subscription[] = [];
    public paperType: string = null;
    public IAM: { editor: boolean } = { editor: false };
    public allRecords: number = 0;
    public page: number = 1;


    constructor(protected reposService: ReposService, protected activeRouter: ActivatedRoute,
        protected utility: UtilityService, protected userService: UserService,
        protected messageService: MessageService, protected router: Router,
        protected storageService: StorageService) {
    }

    ngOnInit() {
        this.subscriptions.push(this.activeRouter.queryParams.subscribe(queryParams => {
            if (queryParams['page']) {
                this.page = parseInt(queryParams['page']);
                this.page = isNaN(this.page) ? 1 : this.page
            }
            if (queryParams['type']) {
                this.paperType = queryParams['type'];
                if (!this.papersFamilies.find(family => family.value == this.paperType)) {
                    this.paperType = 'notebook';
                }
            }
            this.getRepos();
        }));
        this.userService.profile().then(response => {
            if (response && response['role']) {
                this.IAM.editor = response['role'] == 'editor';
            }
        })
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    getRepos() {
        this.repos = [];
        this.reposService.getListRepo(this.page, 'submitted', this.paperType).subscribe((repos: any) => {
            repos['data'].forEach(repo => {
                repo['issueMsg'] = 'Open a new issue';
                this.repos.push(RepoDescriptor.import(repo))
            });
            this.allRecords = repos.allRecords;
            this.page = repos.page;
        });
    }

    goToReview(repo: RepoDescriptor) {
        this.processing[repo.id] = true;
        this.regenerateNb(repo).then(response => {
            this.processing[repo.id] = false;
            let orcid = this.storageService.read('user')['orcid'];
            this.utility.goToJupyter(repo.name, orcid);
        });
        // this.utility.goToMyBinder(repo.name);
    }

    publish(repo: RepoDescriptor) {
        this.processing[repo.id] = true;
        console.log(repo);
        this.reposService.publish(repo['url'], repo.name).subscribe(response => {
            console.log(response);
            this.processing[repo.id] = false;
            setTimeout(() => {
                this.sendNotification('success', 'Repository published successfully');
                this.getRepos();
            }, 1000);
        }, error => {
            this.sendNotification('error', 'Error publishing repository');
            this.processing[repo.id] = false;
        });
    }

    regenerateNb(repo: RepoDescriptor) {
        // console.log(repo);
        return this.reposService.regenerateNb(repo['url'], repo.name).then(response => {
            this.sendNotification('success', 'Repository regenerated successfully');
        }).catch(error => {
            this.sendNotification('error', 'Error regenerating repository');
        });
    }

    sendNotification(severity: string, detail: string) {
        this.messageService.add({
            key: 'notification',
            severity: severity,
            detail: detail,
        });
    }

    paginate(event) {
        this.page = event.page + 1;
        this.update();
    }

    update() {
        this.router.navigate([], {
            queryParams: { page: this.page, type: this.paperType },
            queryParamsHandling: "merge"
        });
    }
}
