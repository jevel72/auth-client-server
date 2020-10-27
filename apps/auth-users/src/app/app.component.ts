import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from './services/auth.service';
import { NotifierService } from './services/nofier.service';

@Component({
  selector: 'authentication-base-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public userLoggedIn: boolean = false;

  private _notifySubscription: Subscription;

  public constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly notifier: NotifierService,
  ) {}

  public ngOnInit(): void {
    this._isUserLoggedIn();
    this._setUpNotifier();
  }

  public ngOnDestroy(): void {
    this._notifySubscription.unsubscribe();
  }

  public logOut(): void {
    this.auth.logOut();
    this._isUserLoggedIn();
    this.router.navigateByUrl('/login');
  }

  private _isUserLoggedIn(): void {
    this.userLoggedIn = this.auth.isUserLoggedIn();
  }

  private _setUpNotifier(): void {
    this._notifySubscription = this.notifier.notify$.subscribe((value: boolean): void => {
      this._isUserLoggedIn();
    });
  }
}
