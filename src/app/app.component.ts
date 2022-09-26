import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private _document: Document) {}
  ngOnInit(): void {
    this._document.documentElement.lang = environment.APP_LANG;
  }
}
