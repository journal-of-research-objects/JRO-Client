import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-repo',
    templateUrl: 'repo.component.html',
    styleUrls: ['repo.component.scss']
})

export class RepoComponent implements OnInit {

    @Input() repo: any;

    constructor() {
    }

    ngOnInit() {
    }

    /**
     * Check the color of the status dock based on the status message
     * @param status: status code
     */
    checkColor(status: string): string{
        let className = '';
        if (status === 'initial') {
            className = 'green';
        } else if(status.includes('error')) {
            className = 'red';
        } else {
            className = 'yellow';
        }
        return className;
    }
}
