import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RepoDescriptor} from '../../types';

@Component({
    selector: 'app-repo',
    templateUrl: 'repo.component.html',
    styleUrls: ['repo.component.scss']
})

export class RepoComponent implements OnInit {

    @Input() repo: any;
    @Input() buttonLabel: string;
    @Input() buttonClass: string;

    @Output() buttonClicked: EventEmitter<RepoDescriptor> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    click() {
        this.buttonClicked.emit(this.repo);
    }
}
