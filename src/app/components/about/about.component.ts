import { Component, OnInit } from '@angular/core';

export interface TeamParticipant {
  name: string
  info?: string;
  avatar: string;
  githubid?: string;
  otherSites?: { icon: string; link: string; }[];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public team: TeamParticipant[] = [
    {
      name: 'Alexander Garcia', avatar: '/assets/team/garcia.jpeg', githubid: 'alexgarciac',
      otherSites: [{ icon: '/assets/img/researchgate.png', link: 'http://blockchain4openscience.com/examples/imgs/researchgate.png' }]
    },
    {
      name: 'Pjotor Prins',
      info: 'Director of <a target="_blank" href="https://genenetwork.org">Genenetwork.org</a>',
      avatar: '/assets/team/prins.jpeg', githubid: 'pjotrp',
      otherSites: [{ icon: '/assets/img/www.svg', link: 'http://thebird.nl/' }]
    },
    {
      name: 'Brayan Rodríguez', avatar: '/assets/team/rodriguez.jpeg', githubid: 'brayanrodbajo',
      otherSites: [{ icon: '/assets/img/linkedin.svg', link: 'https://www.linkedin.com/in/brayanrodbajo' }]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}