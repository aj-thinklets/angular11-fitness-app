import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data-model";
import { User } from "./user.model";

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router) { }


    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.authSucess();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        }
        this.authSucess();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }


    getUser() {
        return { ...this.user } // return copy of object (new object). Better way to access ew/o maniputlating orginal user
    }

    isAuth() {
        return this.user != null;
    }

    private authSucess() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}