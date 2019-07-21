import {Injectable} from '@angular/core';
import {CREDENTIALS} from '../Credentials/credentials';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
    public urlBase = CREDENTIALS.backendURL;

    constructor(protected http: HttpClient) {}

    public autenticate(code: string) {
        const url = `${this.urlBase}/login/?orcid_auth_code=${code}`;
        return this.http.get(url);
    }

}
