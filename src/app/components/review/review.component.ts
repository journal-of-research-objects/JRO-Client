import {Component, Input, OnInit} from '@angular/core';
import {RepoDescriptor} from '../../types';
import {ReposService, UtilityService} from '../../services';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-review',
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.scss']
})

export class ReviewComponent implements OnInit {

    public repos: Array<RepoDescriptor> = [];

    constructor(protected reposService: ReposService,
                protected utility: UtilityService,
                protected messageService: MessageService) {
    }

    ngOnInit() {
        this.getRepos();
    }

    getRepos() {
        this.repos = [];
        this.reposService.getSubmittedRepo('submitted').subscribe((repos: Array<RepoDescriptor>) => {
            repos.forEach(repo => {
                repo['issueMsg'] = 'Open a new issue';
                this.repos.push(RepoDescriptor.import(repo))
            });
        });
    }

    goToReview(repo: RepoDescriptor) {
        this.regenerateNb(repo);
        this.utility.goToJupyter(repo.name);
        // this.utility.goToMyBinder(repo.name);
    }

    publish(repo: RepoDescriptor) {
        console.log(repo);
        this.reposService.publish(repo['url'], repo.name).subscribe( response => {
            console.log(response);
            setTimeout(() => {
                this.sendNotification('success', 'Repository published successfully');
                this.getRepos();
            }, 1000);
        }, error => {
            this.sendNotification('error', 'Error publishing repository');
        });
    }

    regenerateNb(repo: RepoDescriptor) {
        // console.log(repo);
        this.reposService.regenerateNb(repo['url'], repo.name).subscribe( response => {
            this.sendNotification('success', 'Repository regenerated successfully');
        }, error => {
            this.sendNotification('error', 'Error regenerating repository');
        })
    }

    sendNotification(severity: string, detail: string) {
        this.messageService.add({
            key: 'notification',
            severity: severity,
            detail: detail,
        });
    }
}
