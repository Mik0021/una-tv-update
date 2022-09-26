import { SubmenuItem } from './../../interfaces/submenu-item.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-submenu',
  templateUrl: './header-submenu.component.html',
  styleUrls: ['./header-submenu.component.scss'],
})
export class HeaderSubmenuComponent implements OnInit {
  @Input() subcategory: SubmenuItem[] = [];
  @Input() hideMenu: string = '';
  @Output() isMenuShown = new EventEmitter<string>();

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
