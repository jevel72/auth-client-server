import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

import { User } from '../../interfaces/user.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'authentication-base-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {

  public users: User[] = [];

  public usersReserved: User[] = [];

  public currentUser: User;

  public search: FormControl = new FormControl('');

  private _usersSubscription: Subscription;


  public constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly http: HttpClient,
    private readonly title: Title,
    private readonly _users: UsersService,
    private readonly auth: AuthService,
  ) { }

  public ngOnInit(): void {
    this._setUpSubscription();
    this._setUpUser();
    this._setUpTitle();
  }

  public ngOnDestroy(): void {
    this._usersSubscription.unsubscribe();
  }

  public delete(login: string): void {
    this.http.delete('/api/delete', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set('login', login),
    }).subscribe((user: User): void => {
      this._usersSubscription.unsubscribe();
      this._setUpSubscription();
    });
  }

  public filter(): void {
    this.users = this.usersReserved.filter((user: User) => {
      return user.login.startsWith(this.search.value);
    });
  }

  private _setUpSubscription(): void {
    this._usersSubscription = this._users.users$.subscribe((users: User[]): void  => {
      this.users = users;
      this.usersReserved = [...this.users];
      this.cdr.detectChanges();
    });
  }

  private _setUpUser(): void {
    this.currentUser = this.auth.currentUser;
  }

  private _setUpTitle(): void {
    this.title.setTitle('Список пользователей');
  }

}
