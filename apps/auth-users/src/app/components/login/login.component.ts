import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, AbstractControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';
import { NotifierService } from '../../services/nofier.service';

import { Login } from '../../interfaces/login.interface';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'authentication-base-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({});

  public controls: Record<string, AbstractControl>;

  public constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly title: Title,
    private readonly auth: AuthService,
    private readonly notifier: NotifierService,
  ) { }

  public ngOnInit(): void {
    this._setUpForms();
    this._setUpControls();
    this._setUpTitle();
  }

  public login(loginData: Login): void {
    const save: boolean = loginData.save;
    delete loginData.save;
    this.http.post<User>('/api/login', loginData, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
    }).subscribe((user: User): void => {
      this.auth.logUser({
        ...user,
        save,
      });
      this.notifier.changeState();
      this.router.navigateByUrl('/users');
    });
  }

  private _setUpForms(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.pattern('^[A-Za-z]{1}[A-Za-z0-9]{0,15}$')]],
      password: ['', [Validators.required, Validators.pattern('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$')]],
      save: false,
    });
  }

  private _setUpControls(): void {
    this.controls = this.loginForm.controls;
  }

  private _setUpTitle(): void {
    this.title.setTitle('Вход в систему');
  }

}
