import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-authors-guide',
  templateUrl: './authors-guide.component.html',
  styleUrls: ['./authors-guide.component.scss']
})
export class AuthorsGuideComponent implements OnInit {

  public paperType: string = 'notebook';
  public papersFamilies: SelectItem[] = [
    { label: 'Notebook', value: 'notebook' },
    { label: 'OpenSoft', value: 'opensoft' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
