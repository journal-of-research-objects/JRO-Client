import { Injectable } from '@angular/core';
import { User } from '../types';

@Injectable()
export class StorageService {

    get authToken(): string {
        return this.read('token')
    }

    set authToken(value: string) {
        this.write('token', value);
    }

    get user(): User {
        return <User>this.read('user');
    }

    set user(user: User) {
        this.write('user', user);
    }

    write(key: string, value: any) {
        if (value) {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }

    read<T>(key: string): T {
        const value: string = localStorage.getItem(key);

        if (value && value !== 'undefined' && value !== 'null') {
            return <T>JSON.parse(value);
        }

        return null;
    }
}
