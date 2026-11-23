import { Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Search } from 'src/app/interfaces/search.model';
import { SearchService } from './../../services/search.service';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-header-search',
    templateUrl: './header-search.component.html',
    styleUrls: ['./header-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ReactiveFormsModule, FormsModule, NgClass]
})
export class HeaderSearchComponent implements OnInit {
  private router = inject(Router);
  private searchService = inject(SearchService);

  isShown: string = '';
  @ViewChild('searchField', { static: true })
  searchField: ElementRef<HTMLInputElement> = {} as ElementRef;
  constructor() {
    const router = this.router;

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.closeSearch();
      }
    });
  }

  ngOnInit(): void {}

  onSearch(form: NgForm) {
    if (this.isShown === '') {
      this.isShown = 'scale-x-100';
      this.searchField.nativeElement.focus();
    } else {
      this.isShown = '';
    }
    if (form.valid) {
      this.router.navigate(['/pretraga'], {
        queryParams: { q: form.value.search },
      });
      form.reset();
    }
  }

  closeSearch() {
    this.isShown = '';
  }
}
