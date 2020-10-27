import { Injectable, OnInit } from '@angular/core';

import { StorageService } from './storage.service';

import { User } from '../interfaces/user.interface';
import { parse } from 'querystring';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public currentUser: User | null;

    public constructor(
        private readonly storage: StorageService,
    ) {
        this._setUpUser();
    }

    public isUserLoggedIn(): boolean {
        return !Object.is(this.currentUser, null);
    }

    public logUser(user: User): void {
        if (user.save) {
            this.storage.setItem('user', JSON.stringify(user));
        }
        this._setUpUser(user);
    }

    public logOut(): void {
        this.storage.removeItem('user');
        this._setUpUser();
    }

    private _setUpUser(user?: User): void {
        let isUserValid: boolean;
        let parsedUser: User | null;
        const userOrNull: string | null = JSON.stringify(user) || this._getUser();
        const userExists: boolean = this._userExists(userOrNull);
        if (userExists) {
            try {
                parsedUser = JSON.parse(userOrNull);
            } catch(e: unknown) {
                parsedUser = null;
                this.currentUser = null;
                this._removeUserFromStorage();
                return;
            }
            isUserValid = this._validateUser(parsedUser);
        } else {
            this.currentUser = null;
        }
        if (isUserValid) {
            this.currentUser = JSON.parse(userOrNull);
        } else {
            this.currentUser = null;
            this._removeUserFromStorage();
        }
    }

    private _getUser(): string | null {
        return this.storage.getItem('user');
    }

    private _userExists(userOrNull: string | null): boolean {
        return !(Object.is(userOrNull, null));
    }

    private _removeUserFromStorage(): void {
        this.storage.removeItem('user');
    }

    private _validateUser(user: User): user is User {
        if (
            typeof user === 'object' &&
            typeof user.id === 'number' &&
            typeof user.firstname === 'string' &&
            typeof user.lastname === 'string' &&
            typeof user.login === 'string' &&
            typeof user.status === 'string'
        ) {
            return true;
        }
        console.log(user)
        return false;
    }
}