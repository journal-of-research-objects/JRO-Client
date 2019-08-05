import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {AppCustomPrimeNgModule} from './modules/app-custom-primeng.module';

// Local Components
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {SubmitComponent} from './components/submit/submit.component';
import {HomeComponent} from './components/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';

// Local Services
import {RouteGuard, SubmitService, UserService, UtilityService, StorageService} from './services';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SubmitComponent,
        NavbarComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppCustomPrimeNgModule,
        FlexLayoutModule,
        HttpClientModule,
    ],
    providers: [
        RouteGuard,
        UtilityService,
        StorageService,
        UserService,
        SubmitService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
