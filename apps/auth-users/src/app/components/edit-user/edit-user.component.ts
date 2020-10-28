import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';

import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'authentication-base-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent implements OnInit, OnDestroy {

  public currentUser: User;

  public user: User;

  
  public editUser: FormGroup = new FormGroup({});
  
  public controls: Record<string, AbstractControl>;
  
  private _id: number;
  
  private _status: string;

  private _userParams: string;

  private _userSubscription: Subscription;

  public constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private readonly title: Title,
    private readonly auth: AuthService,
    ) { }

  public ngOnInit(): void {
    this._setUpParams();
    this._setUpCurrentUser();
    this._setUpUser();
    this._setUpTitle();
  }
  
  public ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }
  
  public deleteUser(): void {
    this.http.delete('/api/delete', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set('login', this._userParams),
    }).subscribe((user: User): void => {
      this.router.navigateByUrl('/users');
    });
  }

  public givePermissions(permission: string): void {
    this.http.patch('/api/permission', { 
      ...this.editUser.value,
      status: permission,
      id: this._id,
    }).subscribe((user: User): void => {
      this.user = user;
    });
  }

  public edit(user: User): void {
    this.http.patch('/api/edit-user', { ...user, id: this._id, status: this._status }, {
      responseType: 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).subscribe((user: User): void => {
      if (user.id === this.currentUser.id) {
        this.auth.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
      }
      this.router.navigateByUrl('/users');
    });
  }

  public reset(): void {
    this._setUpUser();
  }
  
  private _setUpParams(): void {
    this._userParams = this.route.snapshot.queryParamMap.get('user');
    this.router.navigateByUrl('/edit-user');
  }

  private _setUpCurrentUser(): void {
    this.currentUser = this.auth.currentUser;
  }

  private _setUpUser(): void {
    this._userSubscription = this.http.get('/api/user', {
      responseType: 'json',
      params: new HttpParams().set('login', this._userParams),
    }).subscribe((user: User): void => {
      this.user = user;
      this._id = user.id;
      this._status = user.status;
      this._setUpForm();
    });
  }

  private _setUpForm(): void {
    this.editUser = this.fb.group({
      login: [this.user?.login, [Validators.required, Validators.pattern('^[A-Za-z]{1}[A-Za-z0-9]{0,15}$')]],
      firstname: [this.user?.firstname, [Validators.required, Validators.pattern('^[А-Яа-я]{2,15}$')]],
      lastname: [this.user?.lastname, [Validators.required, Validators.pattern('^[А-Яа-я]{2,15}$')]],
      password: [this.user?.password, [Validators.required, Validators.pattern('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$')]],
    });
    this._setUpControls();
    this.cdr.detectChanges();
  }

  private _setUpControls(): void {
    this.controls = this.editUser.controls;
  }

  private _setUpTitle(): void {
    this.title.setTitle('Редактирование пользователя');
  }

}
