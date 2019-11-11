import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public papersFamilies: SelectItem[] = [
    { label: 'Notebook', value: 'notebook' },
    { label: 'PDF', value: 'pdf' },
  ];
  public paperType: string = 'notebook';

  constructor(protected activeRouter: ActivatedRoute, protected router: Router) { }

  ngOnInit() {
    this.subscriptions.push(this.activeRouter.queryParams.subscribe(queryParams => {
      if (queryParams['type']) {
        this.paperType = queryParams['type'];
        if (!this.papersFamilies.find(family => family.value == this.paperType)) {
          this.paperType = 'notebook';
        }
      }
    }));
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  update() {
    this.router.navigate([], {
      queryParams: { type: this.paperType },
      queryParamsHandling: "merge"
    });
  }

}
