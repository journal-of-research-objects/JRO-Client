import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit {

  public papersFamilies: SelectItem[] = [
    { label: 'Notebook', value: 'notebook' },
    { label: 'Pdf', value: 'pdf' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
