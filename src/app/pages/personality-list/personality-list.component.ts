import { Router } from '@angular/router';
import { Personality } from './../../interfaces/personality.model';
import { PersonalityListing } from './../../interfaces/personality-listing.model';
import { Observable } from 'rxjs';
import { PersonalitiesService } from './../../services/personalities.service';
import { Component, OnInit } from '@angular/core';
import { Paginator } from 'src/app/interfaces/paginator.model';

@Component({
  selector: 'app-personality-list',
  templateUrl: './personality-list.component.html',
  styleUrls: ['./personality-list.component.scss'],
})
export class PersonalityListComponent implements OnInit {
  personalityList = [] as Personality[];

  p: number = 1;
  paginator = {} as Paginator;

  personalitiesList$: Observable<PersonalityListing> =
    this.personalitiesService.personalitiesList$;

  constructor(
    private personalitiesService: PersonalitiesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personalitiesService.getPersonalities();
    this.personalitiesList$.subscribe({
      next: (res: PersonalityListing) => {
        this.personalityList = res.data.tv_personalities;
        this.paginator = res.paginator;
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
}
