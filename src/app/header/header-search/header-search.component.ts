import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgClass],
})
export class HeaderSearchComponent {
  private router = inject(Router);

  /** CSS class that expands the search field. */
  protected readonly isShown = signal('');
  private readonly searchField =
    viewChild.required<ElementRef<HTMLInputElement>>('searchField');

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.isShown.set(''));
  }

  protected onSearch(form: NgForm) {
    if (this.isShown() === '') {
      this.isShown.set('scale-x-100');
      this.searchField().nativeElement.focus();
    } else {
      this.isShown.set('');
    }
    if (form.valid) {
      this.router.navigate(['/pretraga'], {
        queryParams: { q: form.value.search },
      });
      form.reset();
    }
  }
}
