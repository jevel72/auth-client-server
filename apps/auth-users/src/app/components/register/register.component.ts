import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';
import { NotifierService } from '../../services/nofier.service';

import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'authentication-base-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({});

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
    this._setUpForm();
    this._setUpControls();
    this._setUpTitle();
  }

  public register(userData: User): void {
    const save: boolean = userData.save;
    delete userData.save;
    this.http.post('/api/register', userData, {
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

  private _setUpForm(): void {
    this.registerForm = this.fb.group({
      login: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]{1}[A-Za-z0-9]{0,15}$')]),
      firstname: new FormControl('', [Validators.required, Validators.pattern('^[А-Яа-я]{2,15}$')]),
      lastname: new FormControl('', [Validators.required, Validators.pattern('^[А-Яа-я]{2,15}$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$')]),
      save: false,
    });
  }

  private _setUpControls(): void {
    this.controls = this.registerForm.controls;
  }

  private _setUpTitle(): void {
    this.title.setTitle('Регистрация');
  }

}
