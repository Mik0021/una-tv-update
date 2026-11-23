import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Nav } from 'src/app/interfaces/nav.model';

@Component({
    selector: 'app-footer-nav',
    templateUrl: './footer-nav.component.html',
    styleUrls: ['./footer-nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FooterNavComponent implements OnInit {
  @Input() navList = {} as Nav;
  constructor() {}

  ngOnInit(): void {}
}
