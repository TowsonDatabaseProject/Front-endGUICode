import { Component } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public input: any;

    constructor(private httpHandler: HttpHandler, private router: Router, private request: HttpRequest<JSON>) {
        this.input = {
            'email': '',
            'password': ''
        };
    }

    public login() {
        if (this.input.email && this.input.password) {
            const headers = new Headers({ 'content-type': 'application/json' });

            this.httpHandler.post('http://localhost:3000/login', JSON.stringify(this.input), Option)
                .map(result => result.json())
                .subscribe(result => {
                    this.router.navigate(['/blogs'], { 'queryParams': result });
                });
        }
    }

}
