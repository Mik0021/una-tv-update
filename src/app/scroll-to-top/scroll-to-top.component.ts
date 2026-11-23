import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { WindowScrollService } from '../services/window-scroll.service';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class ScrollToTopComponent {
  private readonly scrollY = inject(WindowScrollService).scrollY;
  protected readonly windowScrolled = computed(() => this.scrollY() > 0);

  protected scrollToTop() {
    const step = () => {
      const current = window.scrollY;
      if (current > 0) {
        window.requestAnimationFrame(step);
        window.scrollTo(0, current - current / 8);
      }
    };
    step();
  }
}
