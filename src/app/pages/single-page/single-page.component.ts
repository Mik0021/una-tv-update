
import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  DOCUMENT,
  ChangeDetectionStrategy
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Image } from 'src/app/interfaces/image.model';
import { Search } from 'src/app/interfaces/search.model';
import { Source } from 'src/app/interfaces/source.model';
import { Tags } from 'src/app/interfaces/tags.model';
import { TvShow } from 'src/app/interfaces/tv-show.model';
import { SearchService } from 'src/app/services/search.service';
import { Personality } from './../../interfaces/personality.model';
import { Post } from './../../interfaces/post.model';
import { PostService } from './../../services/post.service';
import { RunScriptsDirective } from '../../directives/run-scripts.directive';
import { NgClass } from '@angular/common';
import { SingleSocialComponent } from './single-social/single-social.component';
import { SingleTagsComponent } from './single-tags/single-tags.component';
import { CardSmallContentDownComponent } from '../../components/card-small-content-down/card-small-content-down.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
    selector: 'app-single-page',
    templateUrl: './single-page.component.html',
    styleUrls: ['./single-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RunScriptsDirective, NgClass, RouterLink, SingleSocialComponent, SingleTagsComponent, CardSmallContentDownComponent, NgxPaginationModule, SafeHtmlPipe]
})
export class SinglePageComponent implements OnInit, AfterViewInit {
  single_post = {} as Post;
  tags_list: Tags[] = [];
  episodes: TvShow[] = [];
  postRoute: string | null = '';
  category: string | null = '';
  subCategory: string | null = '';
  articleSource = {} as Source;
  content: any;
  image = {} as Image;
  appShare: string = '';
  srcSet: string = '';
  isTvLice: boolean = false;
  duration: number = 0;
  personalities: Personality[] = [];
  windowScrolled: boolean = false;

  p: number = 1;

  singleVideo: string = '';

  $search: Observable<Search> = this.searchService.searchRes$;
  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private metaService: Meta,
    private titleService: Title,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private searchService: SearchService
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['p'] === undefined) {
        this.p = 1;
      } else {
        this.p = params['p'];
      }
    });
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (
        !paramMap.has('post') &&
        !paramMap.has('category') &&
        !paramMap.has('subcategory')
      ) {
        return;
      } else {
        this.postRoute = paramMap.get('post');
        this.category = paramMap.get('category');
        this.subCategory = paramMap.get('subcategory');

        if (!this.subCategory) {
          this.postService
            .getParentCategoryPost(this.category, this.postRoute)
            .subscribe({
              next: (post: Post) => {
                this.single_post = post;
                this.tags_list = post.data.tv_tags;
                this.duration = post.data.settings.duration;
                this.episodes = post.data.related_tv_shows;
                // this.episodes.sort((a, b) => {
                //   let aDate = new Date();
                //   let bDate = new Date();
                //   return a.id - b.id;
                // });
                // this.articleSource = post.data.source;
                this.content = this.single_post.data.description;
                this.image = post.data.image;
                this.personalities = post.data.tv_personalities;
                this.addTags();
                this.createSrcSet();
                this.createVideoScript(
                  this.single_post.data.brid_default_player_id,
                  this.single_post.data.brid_video_id
                );
              },
              error: (error: any) => {
                this.router.navigate(['404']);
              },
            });
        } else {
          this.postService
            .getPost(this.category, this.subCategory, this.postRoute)
            .subscribe({
              next: (post: Post) => {
                this.single_post = post;
                this.tags_list = post.data.tv_tags;
                this.duration = post.data.settings.duration;
                this.episodes = post.data.related_tv_shows;
                // this.episodes.sort((a, b) => {
                //   let aDate = new Date();
                //   let bDate = new Date();
                //   return a.id - b.id;
                // });
                // this.articleSource = post.data.source;
                this.content = this.single_post.data.description;
                this.image = post.data.image;
                this.personalities = post.data.tv_personalities;
                this.addTags();
                this.createSrcSet();
                this.createVideoScript(
                  this.single_post.data.brid_default_player_id,
                  this.single_post.data.brid_video_id
                );
              },
              error: (error: any) => {
                this.router.navigate(['404']);
              },
            });
        }
      }
    });
  }

  @HostListener('window:scroll', []) onWindowScroll() {
    if (window.pageYOffset > 350) {
      this.windowScrolled = true;
    } else {
      this.windowScrolled = false;
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  createVideoScript(playerId: string, videoId: string | null) {
    if (videoId === null) {
      return;
    } else {
      this.singleVideo = `<div class="raw-html-embed"><script type="text/javascript" src="https://services.brid.tv/player/build/brid.min.js"></script> <div id="Brid_64470599" class="brid" style="width:480;height:270;" > </div> <script type="text/javascript"> $bp("Brid_64470599", {"id":"${playerId}","width":"480","height":"270","video":"${videoId}"}); </script></div>`;
    }
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
  }

  createSrcSet() {
    if (
      this.image &&
      this.image.thumbnails &&
      this.image.thumbnails[345] &&
      this.image.thumbnails[710] &&
      this.image.thumbnails[944]
    ) {
      this.srcSet = `${this.image.thumbnails[345]} 245w, ${this.image.thumbnails[710]} 490w, ${this.image.thumbnails[944]}`;
    }
  }

  addTags() {
    this.titleService.setTitle(this.single_post.data.title);
    this.metaService.updateTag({
      name: 'description',
      content: this.single_post.data.seo_description,
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: this.single_post.data.tv_category.name,
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: this.single_post.data.title,
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: this.single_post.data.seo_description,
    });
    this.metaService.updateTag({
      property: 'og:image',
      content: this.single_post.data.image
        ? this.single_post.data.image.url
        : 'https://una-test-images.ha.rs/storage/images/2022/09/una.webp',
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
      content: 'article',
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
      content: this.single_post.data.title,
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: this.single_post.data.seo_description,
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: this.single_post.data.image
        ? this.single_post.data.image.url
        : 'https://una-test-images.ha.rs/storage/images/2022/09/una.webp',
    });

    this._document.head
      .querySelector('[rel=canonical]')
      ?.setAttribute('href', `${this._document.location.href}`);
  }
}
