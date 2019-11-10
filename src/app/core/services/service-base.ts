import { HttpClient, HttpParams } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token-interceptor';
import { CREDENTIALS } from 'src/app/credentials/credentials';

/**
 * base para la creacion de servicio que se comunican por el protocolo http
 */
export class HttpServiceBase {

    constructor(protected http: HttpClient) {
    }

    /**
     * se agrega la cabezera que informa al interceptor de ignorar la seguridad
     * de authenticacion en la peticion a realizar
     * @param headers header base
     */
    protected ignoreAuthInterceptorHeader(headers?: { [key: string]: any }): { [key: string]: any } {
        headers = headers ? headers : {};
        headers[TokenInterceptor.INGORE_INTERCEPTOR_HEADER_KEY] = "true";
        return headers;
    }

    /**
     * determina la url raiz de acceso al backend
     */
    protected get rootUrl(): string {
        return CREDENTIALS.backendURL;
    }

    /**
    * concatena la url base con la pasada no incluye / al serparar
    * el root con el segmento pasado
    * @param _for url a concatenar con la base
    */
    protected makeUrlFor(_for: string = ''): string {
        return `${this.rootUrl}${_for ? _for : ''}`;
    }

    /**
     * convierte el mapa de valores pasado a una instancia de HttpParams
     * valida
     * @param params mapa de los parametros a pasar a HttpParams
     */
    protected httpParams(params: { [key: string]: any }): HttpParams {
        let httpparams = new HttpParams();
        for (const key in params) {
            httpparams = httpparams.set(key, params[key]);
        }
        return httpparams;
    }


}