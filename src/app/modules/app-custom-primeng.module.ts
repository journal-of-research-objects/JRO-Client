import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNg modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from "primeng/dropdown";

// PrimeNg services
import { MessageService } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PaginatorModule } from 'primeng/paginator';

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
        TooltipModule,
        DropdownModule,
        SelectButtonModule,
        PaginatorModule
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
        TooltipModule,
        DropdownModule,
        SelectButtonModule,
        PaginatorModule
    ],
    providers: [
        MessageService
    ]
})

export class AppCustomPrimeNgModule {
    constructor() { }
}
