import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/interfaces/article.model';
import { Home } from 'src/app/interfaces/home.model';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home-live-preview',
  templateUrl: './home-live-preview.component.html',
  styleUrls: ['./home-live-preview.component.scss'],
})
export class HomeLivePreviewComponent implements OnInit {
  heroSection = {} as Home;
  heroType: number = 1;
  heroArticleList: Article[] = [];
  sectionArticleList: Article[] = [];
  tokenID: string | null = '';

  home$: Observable<Home> = this.homeService.homeLivePreview$;

  constructor(
    private homeService: HomeService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        return;
      }
      this.tokenID = paramMap.get('id');
    });
  }

  ngOnInit(): void {
    this.homeService.getHomePageLivePreview(this.tokenID);
    this.home$.subscribe((homeData: Home) => {
      this.heroType = homeData.data[0].article_template.id;
      this.heroSection = homeData;
      this.heroArticleList = homeData.data[0].articles;
    });
  }
}
