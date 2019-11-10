import { Injectable } from '@angular/core';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpXsrfTokenExtractor,
    HttpHandler,
    HttpHeaders,
} from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

import { Router } from "@angular/router";
import { Observable, from } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    public static INGORE_INTERCEPTOR_HEADER_KEY: string = "X20-IGNORE-INTERCEPTOR";

    constructor(private _session: AuthService,
        private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // si tiene la cabezera de ignorar, se ignora el filtro
        if (request.headers.has(TokenInterceptor.INGORE_INTERCEPTOR_HEADER_KEY)) {
            let clone_request = request.clone({
                headers: request.headers.delete(TokenInterceptor.INGORE_INTERCEPTOR_HEADER_KEY)
            });
            return next.handle(clone_request);
        }
        // si no esta logueado se envia al home
        if (!this._session.isLoggedIn()) {
            this.sendToHome();
            return Observable.throw("user not logged send to home");
        }
        // authenticate request
        const auth_request = this.addAuthenticationToken(request);
        return next.handle(auth_request).catch((response: any) => {
            if (response instanceof HttpErrorResponse) {
                if (response.status >= 400 && response.status <= 499) {
                    this.sendToHome();
                }
            }
            return Observable.throw(response);
        });
    }

    /**
     * realiza el proceso de agregar el token de authenticacion de la session actual
     * a la solicitud pasada
     * @param request solicitud http a agregar la authenticacion
     */
    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        let sessionToken = this._session.sessionToken;
        return request.clone({
            url: request.url.replace(/([^:])(\/\/+)/g, '$1/'), //remove duplicate forward slashes
            setHeaders: {
                Authorization: `Bearer ${sessionToken}`,
            }
        });
    }

    /**
     * envia al usuario a la pagina de inicio de la aplicacion
     */
    private sendToHome(): void {
        this._session.logOut();
        this.router.navigate(['/']);
    }

}