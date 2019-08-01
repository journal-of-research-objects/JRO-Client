import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// PrimeNg Modules
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
@NgModule({
    imports: [
        BrowserAnimationsModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        TableModule,
        CardModule
    ],
    exports: [
        BrowserAnimationsModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        TableModule,
        CardModule
    ]
})

export class AppCustomPrimeNgModule {
    constructor() {}
}
