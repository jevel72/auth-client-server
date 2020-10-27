import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class RegisterGuard implements CanActivate {
    public constructor(
        private readonly router: Router,
        private readonly auth: AuthService,
    ) {}
    
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const userLoggedIn: boolean = this.auth.isUserLoggedIn();
        if (userLoggedIn) {
            this.router.navigateByUrl('/');
            return false;
        }
        return true;
    }
}