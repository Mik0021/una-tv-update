import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Nav } from 'src/app/interfaces/nav.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['./footer-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink],
})
export class FooterNavComponent implements OnInit {
  @Input() navList = {} as Nav;
  constructor() {}

  ngOnInit(): void {}
}
