import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './Components/login/login.component';
import {SubmitComponent} from './Components/submit/submit.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './Components/home/home.component';

const routes: Routes = [
    // {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'submit', component: SubmitComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
