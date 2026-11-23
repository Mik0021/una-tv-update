import { SubmenuItem } from './../../interfaces/submenu-item.model';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-submenu',
  templateUrl: './header-submenu.component.html',
  styleUrls: ['./header-submenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgClass, NgStyle, RouterLink],
})
export class HeaderSubmenuComponent implements OnInit {
  readonly subcategory = input<SubmenuItem[]>([]);
  readonly hideMenu = input<string>('');
  readonly isMenuShown = output<string>();

  submenuHide: string = '';

  constructor() {}

  ngOnInit(): void {}
  onCollapseSubmenu() {
    if (this.submenuHide === 'max-h-96') {
      this.submenuHide = '';
    } else {
      this.submenuHide = 'max-h-96';
    }
  }

  onMenuClose() {
    this.isMenuShown.emit('-translate-x-full');
  }
}
