import { Component } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { post, HttpClient } from 'selenium-webdriver/http';
import { get } from 'https';
import * as sha from 'js-sha512';

const url = 'http://localhost:3000/login';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public input: any;

    constructor(private httpHandler: HttpHandler, private router: Router, private request: Request, private http: HttpClient) {
        this.input = {
            'email': '',
            'password': ''
        };
        request = new HttpRequest( 'GET', url, )
    }

    public login() {
        if (this.input.email && sha.sha512(this.input.password)) {
            const headers = new Headers({ 'content-type': 'application/json' });

            this.http.send(this.request)
                .map(result => result.json())
                .subscribe(result => {
                    this.router.navigate(['/blogs'], { 'queryParams': result });
                });
        }
    }

}
