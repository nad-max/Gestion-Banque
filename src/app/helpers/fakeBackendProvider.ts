import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
const comptesKey = 'user';
let comptes: any[] = JSON.parse(localStorage.getItem(comptesKey)!) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/component/add-account') && method === 'POST':
                    return addAccount();
                // case url.endsWith('/users/register') && method === 'POST':
                //     return register();
                 case url.endsWith('/component/account') && method === 'GET':
                     return getComptes();
                // case url.match(/\/users\/\d+$/) && method === 'GET':
                //     return getUserById();
                // case url.match(/\/users\/\d+$/) && method === 'PUT':
                //     return updateUser();
                // case url.match(/\/users\/\d+$/) && method === 'DELETE':
                //     return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        

        function addAccount() {
            const compte = body;
            comptes.push(compte);
            localStorage.setItem(comptesKey, JSON.stringify(comptes));
            return ok();
            
        }

        function getComptes() {
            return ok(comptes.map(x => basicDetails(x)));
        }

        // function getUserById() {
        //     if (!isLoggedIn()) return unauthorized();

        //     const user = users.find(x => x.id === idFromUrl());
        //     return ok(basicDetails(user));
        // }

        // function updateUser() {
        //     if (!isLoggedIn()) return unauthorized();

        //     let params = body;
        //     let user = users.find(x => x.id === idFromUrl());

        //     // only update password if entered
        //     if (!params.password) {
        //         delete params.password;
        //     }

        //     // update and save user
        //     Object.assign(user, params);
        //     localStorage.setItem(usersKey, JSON.stringify(users));

        //     return ok();
        // }

        // function deleteUser() {
        //     if (!isLoggedIn()) return unauthorized();

        //     users = users.filter(x => x.id !== idFromUrl());
        //     localStorage.setItem(usersKey, JSON.stringify(users));
        //     return ok();
        // }

        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message: string) {
            return throwError(() => ({ error: { message } }))
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function unauthorized() {
            return throwError(() => ({ status: 401, error: { message: 'Unauthorized' } }))
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicDetails(compte: any) {
            const { id, type, gest, solde } = compte;
            return { id, type, gest, solde };
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};