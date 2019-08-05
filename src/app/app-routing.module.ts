import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SubmitComponent} from './components/submit/submit.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {RouteGuard} from './services/route-guard.service';

const routes: Routes = [
    // {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'submit', component: SubmitComponent, canActivate: [RouteGuard]}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
