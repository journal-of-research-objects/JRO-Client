import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// PrimeNg Modules
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

// PrimeNg Services
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
        ProgressSpinnerModule
    ],
    exports: [
        BrowserAnimationsModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        TableModule,
        CardModule,
        ToastModule,
        ProgressSpinnerModule
    ],
    providers: [
        MessageService
    ]
})

export class AppCustomPrimeNgModule {
    constructor() {}
}
