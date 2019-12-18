import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authors-guide',
  templateUrl: './authors-guide.component.html',
  styleUrls: ['./authors-guide.component.scss']
})
export class AuthorsGuideComponent implements OnInit, OnDestroy {


  public paperType: string = 'notebook';
  public papersFamilies: SelectItem[] = [
    { label: 'Jupyter Notebook', value: 'notebook' },
    { label: 'Open Software', value: 'opensoft' },
  ];

  private subscriptions: Subscription[] = [];

  constructor(private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRouter.queryParams.subscribe(params => {
      if (params['type'] && this.papersFamilies.findIndex(fam => fam.value == params['type'])!=-1) {
        this.paperType = params['type']
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
