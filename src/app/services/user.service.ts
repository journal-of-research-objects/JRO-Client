import { Injectable } from '@angular/core';
import { CREDENTIALS } from '../credentials/credentials';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../types';

@Injectable()
export class UserService {
    public urlBase = CREDENTIALS.backendURL;

    constructor(protected http: HttpClient) { }

    public autenticate(code: string): Observable<User> {
        const url = `${this.urlBase}/login/?orcid_auth_code=${code}`;
        return this.http.get<User>(url);
    }
}
