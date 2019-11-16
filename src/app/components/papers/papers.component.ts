import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilityService } from '../../services/utility.service';
import { RepoDescriptor } from 'src/app/types';
import { ReposService } from 'src/app/services';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public papersFamilies: SelectItem[] = [
    { label: 'All', value: null },
    { label: 'Jupyter Notebook', value: 'notebook' },
    { label: 'Open Software', value: 'opensoft' },
  ];
  public paperType: string = 'notebook';
  public statues: SelectItem[] = [
    { label: 'Published', value: 'published' },
    { label: 'Under Review', value: 'submitted' }
  ];
  public status: string = 'published';
  public page: number = 1;
  public allRecords: number = 0;
  public repos: Array<RepoDescriptor> = [];

  constructor(protected activeRouter: ActivatedRoute, protected router: Router,
    protected reposService: ReposService, protected utility: UtilityService) { }

  ngOnInit() {
    this.subscriptions.push(this.activeRouter.queryParams.subscribe(queryParams => {
      if (queryParams['page']) {
        this.page = parseInt(queryParams['page']);
        this.page = isNaN(this.page) ? 1 : this.page
      }
      if (queryParams['status']) {
        this.status = queryParams['status'];
        if (!this.statues.find(status => status.value == this.status)) {
          this.status = 'published';
        }
      }
      if (queryParams['type']) {
        this.paperType = queryParams['type'];
        if (!this.papersFamilies.find(family => family.value == this.paperType)) {
          this.paperType = 'notebook';
        }
      }
      this.getRepos();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getRepos() {
    this.repos = [];
    this.reposService.getListRepo(this.page, this.status, this.paperType).subscribe((repos: any) => {
      repos['data'].forEach(repo => {
        repo['issueMsg'] = 'Issues';
        this.repos.push(RepoDescriptor.import(repo))
      });
      this.allRecords = repos.allRecords;
      this.page = repos.page;
    });
  }

  update() {
    this.router.navigate([], {
      queryParams: { page: this.page, type: this.paperType, status: this.status },
      queryParamsHandling: "merge"
    });
  }

  paginate(event) {
    this.page = event.page + 1;
    this.update();
  }

  tryIt(repo: RepoDescriptor) {
    if (repo.paperType == 'notebook') {
      this.utility.goToMyBinder(repo.name);
    } else {
      if (repo.paperType == 'opensoft') {
        console.log(repo.url,'=>',encodeURIComponent(repo.url));
        this.router.navigate(['paper-pub'], {
          queryParams: {
            fork_url: encodeURIComponent(repo.url)
          }
        });
      }
    }
  }

}
