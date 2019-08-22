import {Injectable} from '@angular/core';
import {CREDENTIALS} from '../credentials/credentials';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {RepoDescriptor} from '../types';

@Injectable()
export class ReposService {
    public urlBase = CREDENTIALS.backendURL;

    constructor(protected http: HttpClient) {}

    public loginGithub(code: string) {
        let params = new HttpParams();
        params = params.set('github_auth_code', code);
        const url = `${this.urlBase}/github/`;
        return this.http.get<Array<RepoDescriptor>>(url, {params: params});
    }

    public getRepos(accessToken: string) {
        let params = new HttpParams();
        params = params.set('access_token', accessToken);
        const url = `${this.urlBase}/get_repositories/`;
        return this.http.get<Array<RepoDescriptor>>(url, {params: params});
    }

    public submitRepo(repoName: string, gitUser: string, orcid: string) {
        let params = new HttpParams();
        params = params.set('repo_name', repoName);
        params = params.set('user_name', gitUser);
        params = params.set('orcid', orcid);
        const url = `${this.urlBase}/submit/`;
        return this.http.get(url, {params: params});
    }

    public getSubmittedRepo(status: string) {
        let params = new HttpParams();
        params = params.set('status', status);
        const url = `${this.urlBase}/list/`;
        return this.http.get<Array<any>>(url, {params: params});
    }

    public deleteRepo(forkedURL: string) {
        let params = new HttpParams();
        params = params.set('forked_url', forkedURL);
        const url = this.urlBase + '/deletesubmitted/';
        return this.http.get(url, {params: params});
    }
}
