import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-single-social',
    templateUrl: './single-social.component.html',
    styleUrls: ['./single-social.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SingleSocialComponent implements OnInit {
  appShare: string = '';
  constructor() {}

  ngOnInit(): void {
    this.appShare = environment.APP_SHARE;
  }
}
