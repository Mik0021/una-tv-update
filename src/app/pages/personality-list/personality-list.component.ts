import { ActivatedRoute, Router } from '@angular/router';
import { Personality } from './../../interfaces/personality.model';
import { PersonalityListing } from './../../interfaces/personality-listing.model';
import { Observable } from 'rxjs';
import { PersonalitiesService } from './../../services/personalities.service';
import { Component, OnInit, DOCUMENT, ChangeDetectionStrategy, inject } from '@angular/core';
import { Paginator } from 'src/app/interfaces/paginator.model';
import { Meta, Title } from '@angular/platform-browser';
import { PersonalityCardComponent } from '../../components/personality-card/personality-card.component';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
    selector: 'app-personality-list',
    templateUrl: './personality-list.component.html',
    styleUrls: ['./personality-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [PersonalityCardComponent, NgxPaginationModule]
})
export class PersonalityListComponent implements OnInit {
  private personalitiesService = inject(PersonalitiesService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private metaService = inject(Meta);
  private titleService = inject(Title);
  private _document = inject<Document>(DOCUMENT);

  personalityList = [] as Personality[];

  p: number = 1;
  paginator = {} as Paginator;

  personalitiesList$: Observable<PersonalityListing> =
    this.personalitiesService.personalitiesList$;

  constructor() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['p'] === undefined) {
        this.p = 1;
      } else {
        this.p = params['p'];
      }
      this.personalitiesService.getPersonalities(this.p);
    });
  }

  ngOnInit(): void {
    this.personalitiesService.getPersonalities(this.p);
    this.personalitiesList$.subscribe({
      next: (res: PersonalityListing) => {
        this.personalityList = res.data.tv_personalities;
        this.paginator = res.paginator;
        this.addTags();
      },
    });
  }

  getPage(page: number) {
    this.p = page;
    if (this.p > 1) {
      this.router.navigate([], {
        queryParams: {
          p: this.p,
        },
        queryParamsHandling: 'merge',
      });
    } else {
      this.router.navigate([]);
    }
    window.scrollTo(0, 0);
  }

  addTags() {
    this.titleService.setTitle('Naša lica');

    this.metaService.updateTag({
      name: 'description',
      content: 'Pogledajte lica na UNA TV',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'una tv, lica, licnosti',
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: 'Naša lica',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Pogledajte lica na UNA TV',
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: 'https://una-test-images.ha.rs/storage/images/2022/09/una.webp',
    });
    this.metaService.updateTag({
      property: 'og:image:width',
      content: '1920',
    });
    this.metaService.updateTag({
      property: 'og:image:height',
      content: '1080',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: `${this._document.location.href}`,
    });
    this.metaService.updateTag({
      property: 'og:type',
      content: 'website',
    });

    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    this.metaService.updateTag({
      name: 'twitter:site',
      content: '@',
    });
    this.metaService.updateTag({
      name: 'twitter:creator',
      content: `${this._document.location.host}`,
    });
    this.metaService.updateTag({
      name: 'twitter:domain',
      content: `${this._document.location.host}`,
    });
    this.metaService.updateTag({
      name: 'twitter:title',
      content: 'Naša lica',
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: 'Pogledajte lica na UNA TV',
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: 'https://una-test-images.ha.rs/storage/images/2022/09/una.webp',
    });

    this._document.head
      .querySelector('[rel=canonical]')
      ?.setAttribute('href', `${this._document.location.href}`);
  }
}
