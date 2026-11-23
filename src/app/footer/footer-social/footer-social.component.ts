import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer-social',
    templateUrl: './footer-social.component.html',
    styleUrls: ['./footer-social.component.scss'],
    standalone: false
})
export class FooterSocialComponent implements OnInit {
  facebokLink: string = '';
  constructor() {}

  ngOnInit(): void {
    this.facebokLink = environment.APP_FACEBOOK;
  }
}
