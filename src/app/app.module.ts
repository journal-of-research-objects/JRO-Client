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
import {RouteGuard, ReposService, UserService, UtilityService, StorageService, AuthService} from './services';
import {RepoButtonsDirective, RepoComponent} from './components/repo/repo.component';
import {ReviewComponent} from './components/review/review.component';
import {ZeroStateComponent} from './components/zero-state/zero-state.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SubmitComponent,
        ReviewComponent,
        NavbarComponent,
        HomeComponent,
        RepoComponent,
        RepoButtonsDirective,
        ZeroStateComponent
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
        ReposService,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
