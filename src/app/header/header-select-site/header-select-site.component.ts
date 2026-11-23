import { SiteSelect } from './../../interfaces/site-select.model';
import { SiteSelectService } from './../../services/site-select.service';
import { Component, HostListener, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { HeaderSearchComponent } from '../header-search/header-search.component';

@Component({
    selector: 'app-header-select-site',
    templateUrl: './header-select-site.component.html',
    styleUrls: ['./header-select-site.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgClass, HeaderSearchComponent]
})
export class HeaderSelectSiteComponent implements OnInit {
  sites = {} as SiteSelect;
  inside: boolean = false;
  outside: boolean = false;
  toggleSelect: string = 'hidden';
  @HostListener('click') clicked() {
    this.inside = true;
  }

  @HostListener('document:click') clickOutside() {
    this.outside === this.inside ? this.closeSitedMenu() : '';
    this.inside = false;
  }
  constructor(private siteSelectService: SiteSelectService) {}

  ngOnInit(): void {
    this.sites = this.siteSelectService.getSites();
  }

  toggleSitesMenu() {
    if (this.toggleSelect === 'hidden') {
      this.toggleSelect = '';
    } else {
      this.toggleSelect = 'hidden';
    }
  }
  closeSitedMenu() {
    if (this.toggleSelect === '') {
      this.toggleSelect = 'hidden';
    }
  }
}
