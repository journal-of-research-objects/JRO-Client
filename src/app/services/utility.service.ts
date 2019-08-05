import {CREDENTIALS as cred} from '../credentials/credentials';
import {Injectable} from '@angular/core';


@Injectable()

export class UtilityService {

    constructor() {}

    public  loginOrcid() {
        const redirect = window.location.href + 'login';
        const url = `${cred.orcidURL}?client_id=${cred.clientId}&response_type=code&scope=/authenticate&redirect_uri=${redirect}`;
        window.open(url, '_self', 'toolbar=no, scrollbars=yes, width=500, height=600, top=500, left=500');
    }

    public loginGithub() {
        const url = 'https://github.com/login/oauth/authorize?scope=user:email&client_id=' + cred.ghClientId;
        window.open(url, '_self', 'toolbar=no, scrollbars=yes, width=500, height=600, top=500, left=500');
    }
}

