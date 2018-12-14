import {ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';



@Component({templateUrl: 'home.component.html'})

export class HomeComponent {


    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
    ) {}

    onLoginButtonClick(): void {
        this._router.navigate(['./login']);
    }

}
