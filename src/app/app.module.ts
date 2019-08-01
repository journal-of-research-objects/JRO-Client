import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './Components/login/login.component';
import {SubmitComponent} from './Components/submit/submit.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UserService} from './Services/user.service';
import {SubmitService} from './Services/submit.service';
import {HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './Components/home/home.component';
import {AppCustomPrimeNgModule} from './Modules/app-custom-primeng.module';



@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SubmitComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppCustomPrimeNgModule,
        FlexLayoutModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
