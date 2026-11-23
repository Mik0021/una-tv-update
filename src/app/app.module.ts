import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import localeBa from '@angular/common/locales/sr-Latn-BA';
import { FormsModule } from '@angular/forms';
import { AdsenseModule } from 'ng2-adsense';
import { FooterNavComponent } from './footer/footer-nav/footer-nav.component';
import { FooterSocialComponent } from './footer/footer-social/footer-social.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderSearchComponent } from './header/header-search/header-search.component';
import { HeaderSelectSiteComponent } from './header/header-select-site/header-select-site.component';
import { HeaderSubmenuComponent } from './header/header-submenu/header-submenu.component';
import { HeaderComponent } from './header/header.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';

registerLocaleData(localeBa);
@NgModule({ declarations: [
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
    bootstrap: [AppComponent], imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        FormsModule,
        AdsenseModule.forRoot()], providers: [{ provide: LOCALE_ID, useValue: 'sr-Latn-BA' }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
