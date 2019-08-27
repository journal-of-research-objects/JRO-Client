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
        this.repos = [];
        this.reposService.getSubmittedRepo('submitted').subscribe(repos => {
            repos.forEach(repo => {
                repo['html_url'] = repo['fork_url'];
                this.repos.push(RepoDescriptor.import(repo))
            });
        });
    }

    goToReview(repo: RepoDescriptor) {
        this.utility.goToJupyter(repo.name);
    }

    publish(repo: RepoDescriptor) {
        console.log(repo);
        this.reposService.publish(repo.properties['fork_url']).subscribe( response => {
            console.log(response);
            this.messageService.add({
                key: 'notification',
                severity: 'success',
                detail: 'Repository published successfully',
            });
        });
    }
}
