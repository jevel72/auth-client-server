import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';
import { NotifierService } from '../../services/nofier.service';

import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'authentication-base-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  public user: User;

  public constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly title: Title,
    private readonly auth: AuthService,
    private readonly notifier: NotifierService,
  ) { }

  public ngOnInit(): void {
    this._setUpUser();
    this._setUpTitle();
  }

  public delete(): void {
    this.http.delete('/api/delete', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams().set('login', this.user.login),
    }).subscribe((user: User): void => {
      this.auth.logOut();
      this.notifier.changeState();
      this.router.navigateByUrl('/login');
    });
  }

  private _setUpUser(): void {
    this.user = this.auth.currentUser;
  }  

  private _setUpTitle(): void {
    this.title.setTitle('Личный кабинет');
  }
}
