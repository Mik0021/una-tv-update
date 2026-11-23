import { environment } from 'src/environments/environment';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-footer-social',
    templateUrl: './footer-social.component.html',
    styleUrls: ['./footer-social.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager
})
export class FooterSocialComponent implements OnInit {
  facebokLink: string = '';
  constructor() {}

  ngOnInit(): void {
    this.facebokLink = environment.APP_FACEBOOK;
  }
}
