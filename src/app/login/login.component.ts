import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router) {}

SGR(name, password) {
    const request: HttpRequest<string> = new HttpRequest('GET', '/user', JSON.stringify({
        username: 'username',
        password: 'password'
    }));
}

    ngOnInit() {


    }

}
