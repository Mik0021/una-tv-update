
import { Component, HostListener, OnInit, DOCUMENT, ChangeDetectionStrategy, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GtagService } from './services/gtag.service';
import { NgClass } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgClass, HeaderComponent, RouterOutlet, FooterComponent, ScrollToTopComponent]
})
export class AppComponent implements OnInit {
  private _document = inject<Document>(DOCUMENT);
  private gtagService = inject(GtagService);

  windowScrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }
  ngOnInit(): void {
    this._document.documentElement.lang = environment.APP_LANG;
  }
}
