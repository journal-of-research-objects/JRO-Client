import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../../services/utility.service';
import { RepoDescriptor } from '../../types';
import { ReposService } from '../../services';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
    public repos: Array<RepoDescriptor> = [];
    constructor(protected router: Router,
        protected reposService: ReposService,
        protected utility: UtilityService) {
    }

    ngOnInit() {
        this.repos = [];
        this.reposService.getListRepo(1, 'published').subscribe((repos: Array<RepoDescriptor>) => {
            console.log(repos['data']);
            repos['data'].forEach(repo => {
                repo['issueMsg'] = 'Issues';
                this.repos.push(RepoDescriptor.import(repo))
            });
        });
    }

    goToSubmit() {
        this.router.navigate(['/submit']);
    }

    goToReview() {
        this.router.navigate(['/review'])
    }

    tryIt(repo: RepoDescriptor) {
        this.utility.goToMyBinder(repo.name);
    }
}
