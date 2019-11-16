import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppCustomPrimeNgModule } from './modules/app-custom-primeng.module';

// Local Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SubmitComponent } from './components/submit/submit.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Local Services
import { RouteGuard, ReposService, UserService, UtilityService, StorageService, AuthService } from './services';
import { RepoButtonsDirective, RepoComponent } from './components/repo/repo.component';
import { ReviewComponent } from './components/review/review.component';
import { ZeroStateComponent } from './components/zero-state/zero-state.component';
import { SubmitRepoFormModule } from './components/submit-repo-form/submit-repo-form.module';
import { TimeAgoPipe } from 'time-ago-pipe';
import { GithubUserCardModule } from './components/github-user-card/github-user-card.module';
import { AuthorsGuideModule } from './components/guides/authors-guide/authors-guide.module';
import { PapersComponent } from "./components/papers/papers.component";
import { TokenInterceptor } from './core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PapersPublicationViewerComponent } from './components/papers-publication-viewer/papers-publication-viewer.component';

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
        ZeroStateComponent,
        TimeAgoPipe,
        PapersComponent,
        PapersPublicationViewerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppCustomPrimeNgModule,
        FlexLayoutModule,
        HttpClientModule,
        SubmitRepoFormModule,
        GithubUserCardModule,
        AuthorsGuideModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
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
