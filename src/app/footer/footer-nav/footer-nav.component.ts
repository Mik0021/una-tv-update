import { Component, Input, OnInit } from '@angular/core';
import { Nav } from 'src/app/interfaces/nav.model';

@Component({
    selector: 'app-footer-nav',
    templateUrl: './footer-nav.component.html',
    styleUrls: ['./footer-nav.component.scss'],
    standalone: false
})
export class FooterNavComponent implements OnInit {
  @Input() navList = {} as Nav;
  constructor() {}

  ngOnInit(): void {}
}
