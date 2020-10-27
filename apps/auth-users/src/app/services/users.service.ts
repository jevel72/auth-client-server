import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '../interfaces/user.interface';


@Injectable({
    providedIn: 'root',
})
export class UsersService {
    public users$: Observable<User[]>;
    
    public constructor(
        private readonly http: HttpClient,
    ) {
        this._setUpObservable();
    }

    private _setUpObservable(): void {
        this.users$ = this.http.get<User[]>('/api/users', {
            responseType: 'json',
        });
    }

}