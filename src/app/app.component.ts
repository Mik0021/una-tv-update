import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  computed,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { GtagService } from './services/gtag.service';
import { WindowScrollService } from './services/window-scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    ScrollToTopComponent,
  ],
})
export class AppComponent {
  private readonly scrollY = inject(WindowScrollService).scrollY;
  /** Header gets a solid background once the page is scrolled. */
  protected readonly windowScrolled = computed(() => this.scrollY() > 0);

  constructor() {
    // Pushes a `page` event to the GTM dataLayer on every navigation.
    inject(GtagService);
    inject(DOCUMENT).documentElement.lang = environment.APP_LANG;
  }
}
