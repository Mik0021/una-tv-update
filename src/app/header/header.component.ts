import { NavService } from './../services/nav.service';
import { Component, OnInit } from '@angular/core';
import { Nav } from '../interfaces/nav.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMenuShown: string = '-translate-x-full';
  navList = {} as Nav;
  nav$: Observable<Nav> = this.navService.allNav$;

  constructor(private navService: NavService) {}

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
