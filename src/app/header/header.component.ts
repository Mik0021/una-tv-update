import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavService } from './../services/nav.service';
import { HeaderSearchComponent } from './header-search/header-search.component';
import { HeaderSubmenuComponent } from './header-submenu/header-submenu.component';

const MENU_HIDDEN = '-translate-x-full';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgClass,
    NgStyle,
    RouterLinkActive,
    HeaderSubmenuComponent,
    HeaderSearchComponent,
  ],
})
export class HeaderComponent {
  protected readonly nav = inject(NavService).nav;

  /** Mobile menu: CSS class that slides it out of view when closed. */
  protected readonly isMenuShown = signal(MENU_HIDDEN);

  protected onMenuOpen() {
    this.isMenuShown.set('');
  }

  protected onMenuClose() {
    this.isMenuShown.set(MENU_HIDDEN);
  }
}
