import { SiteSelectService } from './../services/site-select.service';
import { Observable } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Nav } from '../interfaces/nav.model';
import { NavService } from '../services/nav.service';
import { SiteSelect } from '../interfaces/site-select.model';
import { Pages } from '../interfaces/pages.model';
import { RouterLink } from '@angular/router';
import { FooterNavComponent } from './footer-nav/footer-nav.component';
import { FooterSocialComponent } from './footer-social/footer-social.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink, FooterNavComponent, FooterSocialComponent],
})
export class FooterComponent implements OnInit {
  private navService = inject(NavService);
  private siteSelectService = inject(SiteSelectService);

  sites = {} as SiteSelect;
  nav$: Observable<Nav> = this.navService.allNav$;
  pages$: Observable<Pages> = this.navService.footerPages$;
  navList = {} as Nav;
  pagesList = {} as Pages;

  ngOnInit(): void {
    this.sites = this.siteSelectService.getSites();
    this.navService.getFooterPages();
    this.nav$.subscribe((nav) => {
      this.navList = nav;
    });
    this.pages$.subscribe((pg: Pages) => {
      this.pagesList = pg;
    });
  }
}
