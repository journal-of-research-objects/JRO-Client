import {Component, Input, OnInit} from '@angular/core';
import {RepoDescriptor} from '../../types';
import {ReposService, UtilityService} from '../../services';

@Component({
    selector: 'app-review',
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.scss']
})

export class ReviewComponent implements OnInit {

    public repos: Array<RepoDescriptor> = [];

    constructor(protected reposService: ReposService,
                protected utility: UtilityService) {
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

    onButtonClicked(repo: RepoDescriptor) {
        console.log(repo);
        this.utility.goToJupyter(repo.name);
    }
}
