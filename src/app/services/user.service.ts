import { Injectable } from '@angular/core';
import { CREDENTIALS } from '../credentials/credentials';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../types';
import { HttpServiceBase } from '../core/services';

@Injectable()
export class UserService extends HttpServiceBase {

    constructor(http: HttpClient) {
        super(http);
    }

    public autenticate(code: string): Observable<User> {
        return this.http.get<User>(this.makeUrlFor(`/login/`), {
            params: { 'orcid_auth_code': code },
            headers: this.ignoreAuthInterceptorHeader()
        });
    }

    public profile() {
        return this.http.get(this.makeUrlFor('/profile/')).toPromise();
    }
}
