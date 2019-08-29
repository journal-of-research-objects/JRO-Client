import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

    public redirectUrl: string;

    constructor() {
    }

    logOut() {
        localStorage.clear();
    }

    isLoggedIn(): boolean{
        return localStorage.getItem('isLoggedIn') ? true : false;
    }

}
