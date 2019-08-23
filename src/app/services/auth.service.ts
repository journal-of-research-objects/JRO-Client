import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

    public redirectUrl: string;

    constructor() {
    }

    isLoggedIn(): boolean{
        if (localStorage.getItem('isLoggedIn')) {
            return true;
        }else {
            return false;
        }
    }

}
