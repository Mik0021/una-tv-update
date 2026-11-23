import {
  ChangeDetectionStrategy,
  Component,
  RESPONSE_INIT,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  constructor() {
    // Server-side only (null in the browser): send a real 404 instead of 200.
    // Covers `/404`, the `**` fallback and pages that navigate to 404 after an
    // API error during SSR.
    const responseInit = inject(RESPONSE_INIT, { optional: true });
    if (responseInit) {
      responseInit.status = 404;
    }
  }
}
