import {Injectable} from '@angular/core';
import {CREDENTIALS} from '../credentials/credentials';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RepoDescriptor} from '../types';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';

@Injectable()
export class ReposService {
    public urlBase = CREDENTIALS.backendURL;

    constructor(protected http: HttpClient, protected storageService: StorageService) {}

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

    public submitRepo(repoName: string, gitUser: string, orcid: string) {
        let params = new HttpParams();
        params = params.set('repo_name', repoName);
        params = params.set('user_name', gitUser);
        params = params.set('orcid', orcid);
        const url = `${this.urlBase}/submit/`;
        return this.getResponse(url, params);
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
        return this.getResponse(url, params);
    }

    private getResponse(url: string, params) {
        const token = this.storageService.read('token');
        const options = {params: params, headers: token ? {'Authorization': `Bearer ${token}`} : {}};
        return this.http.get(url, options);
    }
}
