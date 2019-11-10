import { Injectable } from '@angular/core';
import { CREDENTIALS } from '../credentials/credentials';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RepoDescriptor, RepoSubmit } from '../types';
import { StorageService } from './storage.service';
import { HttpServiceBase } from '../core/services';

@Injectable()
export class ReposService extends HttpServiceBase {

    constructor(http: HttpClient, protected storageService: StorageService) {
        super(http);
    }

    public loginGithub(code: string) {
        return this.http.get(this.makeUrlFor('/github/'), {
            params: { 'github_auth_code': code }
        });
    }

    public getRepos(accessToken: string) {
        return this.http.get(this.makeUrlFor('/get_repositories/'), {
            params: this.httpParams({ 'access_token': accessToken })
        });
    }

    /**WARNING: Any user can access to the status of a repo of any other user.
     * SUG: To employ sockets.
     */
    public getStatusRepo(oriUrl: string) {
        return this.http.get(this.makeUrlFor('/get_status_repo/'), {
            params: this.httpParams({ 'repo_url': oriUrl })
        });
    }

    public submitRepo(submitData: RepoSubmit) {
        return this.http.post(this.makeUrlFor('/submit/'), {
            repo_name: submitData.name,
            user_name: submitData.gitUser,
            orcid: submitData.orcid,
            authors: submitData.authors,
            keywords: submitData.keywords ? submitData.keywords.join(',') : null
        });
    }

    public getListRepo(status: string) {
        return this.http.get(this.makeUrlFor('/list/'), {
            params: this.httpParams({ 'status': status }),
            headers: this.ignoreAuthInterceptorHeader()
        })
    }

    public deleteRepo(forkedURL: string) {
        return this.http.get(this.makeUrlFor('/deletesubmitted/'), {
            params: this.httpParams({ 'forked_url': forkedURL })
        });
    }

    public publish(forkURL: string, repoName: string) {
        return this.http.get(this.makeUrlFor('/publish/'), {
            params: this.httpParams({ 'fork_url': forkURL, 'repo_name': repoName })
        });
    }

    public regenerateNb(forkedURL: string, repoName: string) {
        return this.http.get(this.makeUrlFor('/regenerate_nb/'), {
            params: this.httpParams({ 'forked_url': forkedURL, 'repo_name': repoName })
        }).toPromise();
    }

}
