import { CREDENTIALS as cred } from '../credentials/credentials';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

    constructor() {
    }

    public loginOrcid() {
        const redirect = window.location.origin + "/login";
        const url = `${cred.orcidURL}?client_id=${cred.clientId}&response_type=code&scope=/authenticate&redirect_uri=${redirect}`;
        this.navigate(url, '_self');
    }

    public loginGithub() {
        const url = 'https://github.com/login/oauth/authorize?scope=user:email&client_id=' + cred.ghClientId;
        this.navigate(url, '_self');
    }

    public goToJupyter(forkName: string, orcid: string) {
        const url = `${cred.jupyterURL}/user/${orcid}/notebooks/repos/${forkName}/paper.ipynb?kernel_name=${forkName.toLowerCase()}`;
        this.navigate(url, '_blank');
    }


    public goToMyBinder(forkName: string) {
        const url = `${cred.myBinderURL}/${cred.ghOrganizationName}/${forkName}/master?filepath=paper.ipynb`;
        this.navigate(url, '_blank');
    }

    public goToPaper(forkUrl: string) {
        console.log(forkUrl)
        const url = `${forkUrl}/blob/master/paper.md`
        this.navigate(url, '_blank');
    }

    public goToGithubRepos(){
        const url = `https://github.com/${cred.ghOrganizationName}`;
        this.navigate(url, '_blank');
    }

    private navigate(url: string, tab: string) {
        window.open(url, tab);
    }
}
