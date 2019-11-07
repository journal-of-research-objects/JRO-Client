import { Injectable } from '@angular/core';
import { CREDENTIALS } from '../credentials/credentials';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RepoDescriptor, RepoSubmit } from '../types';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class ReposService {
    public urlBase = CREDENTIALS.backendURL;

    constructor(protected http: HttpClient, protected storageService: StorageService) { }

    public loginGithub(code: string) {
        let params = new HttpParams();
        params = params.set('github_auth_code', code);
        const url = `${this.urlBase}/github/`;
        return this.getResponse(url, params);
    }

    public getRepos(accessToken: string) {
        let params = new HttpParams();
        params = params.set('access_token', accessToken);
        const url = `${this.urlBase}/get_repositories/`;
        return this.getResponse(url, params);
    }

    /**WARNING: Any user can access to the status of a repo of any other user.
     * SUG: To employ sockets.
     */
    public getStatusRepo(oriUrl: string) {
        let params = new HttpParams();
        params = params.set('repo_url', oriUrl);
        const url = `${this.urlBase}/get_status_repo/`;
        return this.getResponse(url, params);
    }

    public submitRepo(submitData: RepoSubmit) {
        let params = new FormData();
        params.append('repo_name', submitData.name);
        params.append('user_name', submitData.gitUser);
        params.append('orcid', submitData.orcid);
        params.append('authors', <any>submitData.authors);
        params.append('keywords', submitData.keywords ? submitData.keywords.join(',') : null);
        const url = `${this.urlBase}/submit/`;
        return this.http.post(url, {
            repo_name: submitData.name,
            user_name: submitData.gitUser,
            orcid: submitData.orcid,
            authors: submitData.authors,
            keywords: submitData.keywords ? submitData.keywords.join(',') : null
        }, { headers: this.headers });
    }

    public getSubmittedRepo(status: string) {
        let params = new HttpParams();
        params = params.set('status', status);
        const url = `${this.urlBase}/list/`;
        return this.getResponse(url, params);
    }

    public getPublishedRepo() {
        let params = new HttpParams();
        const url = `${this.urlBase}/listpub/`;
        return this.getResponse(url, params);
    }

    public deleteRepo(forkedURL: string) {
        let params = new HttpParams();
        params = params.set('forked_url', forkedURL);
        const url = this.urlBase + '/deletesubmitted/';
        return this.getResponse(url, params);
    }

    public publish(forkURL: string, repoName: string) {
        let params = new HttpParams();
        params = params.set('fork_url', forkURL);
        params = params.set('repo_name', repoName);
        const url = this.urlBase + '/publish/';
        return this.getResponse(url, params);
    }

    public regenerateNb(forkedURL: string, repoName: string) {
        let params = new HttpParams();
        params = params.set('forked_url', forkedURL);
        params = params.set('repo_name', repoName);
        const url = this.urlBase + '/regenerate_nb/';
        return this.getResponse(url, params).toPromise();
    }

    private getResponse(url: string, params) {
        const options = { params: params, headers: this.headers };
        return this.http.get(url, options);
    }

    private get headers(): { [key: string]: any } {
        const token = this.storageService.authToken;
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
}
