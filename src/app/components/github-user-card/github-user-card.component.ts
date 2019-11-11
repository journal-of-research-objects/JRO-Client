import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-github-user-card',
  templateUrl: './github-user-card.component.html',
  styleUrls: ['./github-user-card.component.scss']
})
export class GithubUserCardComponent implements OnInit {

  @Input() user: { avatar_url: string, html_url: string, login: string };

  constructor() { }

  ngOnInit() {
  }

}
