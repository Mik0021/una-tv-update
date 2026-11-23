import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ShareButtonDirective } from 'ngx-sharebuttons';
import { ViberShareDirective } from '../../../directives/viber-share.directive';

@Component({
  selector: 'app-single-social',
  templateUrl: './single-social.component.html',
  styleUrls: ['./single-social.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ShareButtonDirective, ViberShareDirective],
})
export class SingleSocialComponent implements OnInit {
  appShare: string = '';
  constructor() {}

  ngOnInit(): void {
    this.appShare = environment.APP_SHARE;
  }
}
