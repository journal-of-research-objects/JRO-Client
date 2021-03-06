import { Component, Input, OnInit, Directive } from '@angular/core';

@Component({
    selector: 'app-repo',
    templateUrl: 'repo.component.html',
    styleUrls: ['repo.component.scss']
})

export class RepoComponent implements OnInit {

    @Input() repo: RepoDescriptor;

    constructor() {
    }

    ngOnInit() {
    }

    /**
     * Check the color of the status dock based on the status message
     * @param status: status code
     */
    checkColor(status: string): string {
        let className = '';
        if (status === 'initial') {
            className = 'green';
        } else if (status.includes('error')) {
            className = 'red';
        } else {
            className = 'yellow';
        }
        return className;
    }

    checkStatusMessage(status: string): string {
        let message = '';
        if (status === 'initial') {
            message = 'Repo ready to be submitted';
        } else if (status === 'forked') {
            message = 'Verification of the repository in progress';
        } else if (status === 'submitted') {
            message = 'Repository submitted';
        } else if (status === 'published') {
            message = 'Repository published successfully';
        } else if (status.includes('error:verify not exist')) {
            message = 'Please verify the existence of the files required for the submission.';
        } else if (status.includes('error:verify')) {
            message = 'Error verifying the existence of the files.';
        } else if (status.includes('error:libs')) {
            message = 'Error installing the libraries of the requirements.txt.';
        } else if (status.includes('error:metadata')) {
            message = 'Error adding authors and keywords';
        } else if (status.includes('error:clone') || (status.includes('error:venvcreation') || status.includes('error:add_venv_gitignore'))) {
            message = ' Error cloning the repository';
        } else if (status.includes('error:nbcreation')) {
            message = 'Error in the creation of the notebook. Please verify the files paper.md and requirements.txt are well structured.';
        } else if (status.includes('error')) {
            message = 'Error submitting the repo.'
        } else {
            message = status;
        }
        return message;
    }
}

import { } from '@angular/core';
import { RepoDescriptor } from 'src/app/types';

@Directive({ selector: '[repo-buttons]' })
export class RepoButtonsDirective {
    constructor() {
    }
}
