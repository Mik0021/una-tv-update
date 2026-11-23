import { NavService } from './../services/nav.service';
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Nav } from '../interfaces/nav.model';
import { Observable } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgStyle } from '@angular/common';
import { HeaderSubmenuComponent } from './header-submenu/header-submenu.component';
import { HeaderSearchComponent } from './header-search/header-search.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterLink, NgClass, NgStyle, RouterLinkActive, HeaderSubmenuComponent, HeaderSearchComponent]
})
export class HeaderComponent implements OnInit {
  private navService = inject(NavService);

  isMenuShown: string = '-translate-x-full';
  navList = {} as Nav;
  nav$: Observable<Nav> = this.navService.allNav$;

  ngOnInit(): void {
    this.navService.getNav();
    this.nav$.subscribe((nav) => {
      this.navList = nav;
    });
  }
  onMenuOpen() {
    this.isMenuShown = '';
  }

  onMenuClose() {
    this.isMenuShown = '-translate-x-full';
  }

  closeFromSubmenu(close: string) {
    this.onMenuClose();
  }
}
