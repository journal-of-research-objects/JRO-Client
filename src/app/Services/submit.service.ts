import {Injectable} from '@angular/core';
import {CREDENTIALS} from '../Credentials/credentials';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SubmitService {
    public urlBase = CREDENTIALS.backendURL;

    constructor(protected http: HttpClient) {}

    public getRepos(code: string) {
        const url = `${this.urlBase}/github/?github_auth_code=${code}`;
        return this.http.get<Array<any>>(url);
    }

    public forkRepo(repoURL: string) {
        const url = `${this.urlBase}/fork/?repo_url_fork=${repoURL}`;
        return this.http.get(url);
    }

}
