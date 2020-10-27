import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'authentication-base-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {

  public constructor(private readonly title: Title) { }

  public ngOnInit(): void {
    this._setUpTitle();
  }

  private _setUpTitle(): void {
    this.title.setTitle('Страница не найдена');
  }

}
