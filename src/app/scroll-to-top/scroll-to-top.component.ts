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
    // The old hand-rolled easing (y -= y / 8 per frame) stalled a few pixels
    // above 0 and kept a requestAnimationFrame loop running forever.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
