import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'authentication-base-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  public userLoggedIn: boolean = false;

  public constructor(
    private readonly auth: AuthService,
    private readonly title: Title,
  ) { }

  public ngOnInit(): void {
    this._isUserLoggedIn();
    this._setUpTitle();
  }

  public _isUserLoggedIn(): void {
    this.userLoggedIn = this.auth.isUserLoggedIn();
  }

  private _setUpTitle(): void {
    this.title.setTitle('Главная страница');
  }

}
