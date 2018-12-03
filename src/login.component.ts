import { Component } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Router } from "@angular/router";
import "rxjs/Rx";
 
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
    public input: any;
 
    constructor(private http: HttpHandler, private router: Router) {
        this.input = {
            "email": "",
            "password": ""
        };
    }
 
    public login() {
        if(this.input.email && this.input.password) {
            let headers = new Headers({ "content-type": "application/json" });

            this.http.post("http://localhost:3000/login", JSON.stringify(this.input), Option)
                .map(result => result.json())
                .subscribe(result => {
                    this.router.navigate(["/blogs"], { "queryParams": result });
                });
        }
    }
 
}