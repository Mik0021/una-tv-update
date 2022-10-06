import { StaticService } from './../services/static.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pages } from '../interfaces/pages.model';
import { Tabs } from '../interfaces/tabs.model';
import { NavService } from '../services/nav.service';
import { Static } from '../interfaces/static.model';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {
  staticPage = {} as Static;
  pages$: Observable<Pages> = this.navService.footerPages$;
  pagesList = {} as Pages;
  // tabs = [] as Tabs[];
  tabs: Tabs[] = [];
  constructor(
    private navService: NavService,
    private staticService: StaticService
  ) {}
  ngOnInit(): void {
    this.navService.getFooterPages();
    this.pages$.subscribe((pg: Pages) => {
      this.pagesList = pg;
      for (let i = 0; i < this.pagesList.data.length; i++) {
        if (i > 2 && i < 10) {
          this.staticService
            .getStaticPage(this.pagesList.data[i].slug.slice(2))
            .subscribe({
              next: (res: Static) => {
                this.staticPage = res;
                if (i === 3) {
                  this.tabs.push({
                    title: this.pagesList.data[i].title,
                    active: true,
                    content: this.staticPage.data.description,
                  });
                } else {
                  this.tabs.push({
                    title: this.pagesList.data[i].title,
                    active: false,
                    content: this.staticPage.data.description,
                  });

                  this.tabs.sort((a, b) => {
                    return +a.title.slice(0, 2) - +b.title.slice(0, 2);
                  });
                }
              },
              error: (error: any) => {},
            });
        }
      }
    });
  }
  sortNumber(a: number, b: number) {
    return a - b;
  }
}
