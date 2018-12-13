import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        ) {}

    ngOnInit() {


    }

}
