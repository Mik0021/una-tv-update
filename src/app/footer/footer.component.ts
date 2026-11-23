import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavService } from '../services/nav.service';
import { FooterNavComponent } from './footer-nav/footer-nav.component';
import { FooterSocialComponent } from './footer-social/footer-social.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FooterNavComponent, FooterSocialComponent],
})
export class FooterComponent {
  private readonly navService = inject(NavService);
  protected readonly nav = this.navService.nav;
  protected readonly pages = this.navService.footerPages;
}
