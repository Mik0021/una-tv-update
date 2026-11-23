import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubmenuItem } from './../../interfaces/submenu-item.model';

@Component({
  selector: 'app-header-submenu',
  templateUrl: './header-submenu.component.html',
  styleUrls: ['./header-submenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgStyle, RouterLink],
})
export class HeaderSubmenuComponent {
  readonly subcategory = input<SubmenuItem[]>([]);
  /** Emitted when a submenu link is clicked, so the header closes the mobile menu. */
  readonly isMenuShown = output<string>();

  /** Mobile: CSS class that expands the submenu. */
  protected readonly submenuHide = signal('');

  protected onCollapseSubmenu() {
    this.submenuHide.update((cls) => (cls === 'max-h-96' ? '' : 'max-h-96'));
  }

  protected onMenuClose() {
    this.isMenuShown.emit('-translate-x-full');
  }
}
