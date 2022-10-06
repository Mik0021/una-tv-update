import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pages } from '../interfaces/pages.model';
import { Tabs } from '../interfaces/tabs.model';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {
  pages$: Observable<Pages> = this.navService.footerPages$;
  pagesList = {} as Pages;
  tabs = [] as Tabs[];
  constructor(private navService: NavService) {}
  ngOnInit(): void {
    this.navService.getFooterPages();
    this.pages$.subscribe((pg: Pages) => {
      this.pagesList = pg;

      console.log(this.pagesList);
    });
  }
}
