import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// PrimeNg modules
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TooltipModule} from 'primeng/tooltip';

// PrimeNg services
import {MessageService} from 'primeng/api';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        TableModule,
        CardModule,
        ToastModule,
        ProgressSpinnerModule,
        TooltipModule
    ],
    exports: [
        BrowserAnimationsModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        TableModule,
        CardModule,
        ToastModule,
        ProgressSpinnerModule,
        TooltipModule
    ],
    providers: [
        MessageService
    ]
})

export class AppCustomPrimeNgModule {
    constructor() {}
}
