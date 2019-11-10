import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

    public redirectUrl: string;

    constructor(private storageService: StorageService) {
    }

    logOut() {
        localStorage.clear();
    }

    isLoggedIn(): boolean {
        return this.storageService.authToken ? true : false;
    }

    get sessionToken() {
        return this.storageService.authToken;
    }

}
