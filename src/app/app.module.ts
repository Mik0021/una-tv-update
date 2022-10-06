import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { AdsenseModule } from 'ng2-adsense';
import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from 'ngx-google-analytics';
import { FooterNavComponent } from './footer/footer-nav/footer-nav.component';
import { FooterSocialComponent } from './footer/footer-social/footer-social.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderSearchComponent } from './header/header-search/header-search.component';
import { HeaderSelectSiteComponent } from './header/header-select-site/header-select-site.component';
import { HeaderSubmenuComponent } from './header/header-submenu/header-submenu.component';
import { HeaderComponent } from './header/header.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderSearchComponent,
    HeaderSelectSiteComponent,
    HeaderComponent,
    FooterNavComponent,
    FooterComponent,
    FooterSocialComponent,
    ScrollToTopComponent,
    HeaderSubmenuComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxGoogleAnalyticsModule.forRoot('UA-215555790-1'),
    NgxGoogleAnalyticsRouterModule,
    AdsenseModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
