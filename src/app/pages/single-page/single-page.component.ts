import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SeoService } from 'src/app/services/seo.service';
import { WindowScrollService } from 'src/app/services/window-scroll.service';
import { CardSmallContentDownComponent } from '../../components/card-small-content-down/card-small-content-down.component';
import { HtmlEmbedComponent } from '../../components/html-embed/html-embed.component';
import { pageParam } from '../../utils/paging';
import { lastValue, notFoundOnError } from '../../utils/resource';
import { PostService } from './../../services/post.service';
import { SingleSocialComponent } from './single-social/single-social.component';
import { SingleTagsComponent } from './single-tags/single-tags.component';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HtmlEmbedComponent,
    RouterLink,
    SingleSocialComponent,
    SingleTagsComponent,
    CardSmallContentDownComponent,
    NgxPaginationModule,
  ],
})
export class SinglePageComponent {
  private router = inject(Router);

  /** Route params: `:category/:post` or `:category/:subcategory/:post`. */
  readonly category = input<string>();
  readonly subcategory = input<string>();
  readonly post = input<string>();
  /** Query param `p` (episode list page). */
  readonly p = input(1, { transform: pageParam });

  private readonly resource = inject(PostService).post(
    this.category,
    this.subcategory,
    this.post,
  );
  protected readonly data = lastValue(this.resource);

  protected readonly episodes = computed(
    () => this.data()?.data.related_tv_shows ?? [],
  );

  protected readonly srcSet = computed(() => {
    const thumbs = this.data()?.data.image?.thumbnails;
    return thumbs?.[345] && thumbs?.[710] && thumbs?.[944]
      ? `${thumbs[345]} 245w, ${thumbs[710]} 490w, ${thumbs[944]}`
      : '';
  });

  /** Brid.tv player embed for posts with a video. */
  protected readonly video = computed(() => {
    const post = this.data()?.data;
    if (!post?.brid_video_id) {
      return '';
    }
    return `<div class="raw-html-embed"><script type="text/javascript" src="https://services.brid.tv/player/build/brid.min.js"></script> <div id="Brid_64470599" class="brid" style="width:480;height:270;" > </div> <script type="text/javascript"> $bp("Brid_64470599", {"id":"${post.brid_default_player_id}","width":"480","height":"270","video":"${post.brid_video_id}"}); </script></div>`;
  });

  private readonly scrollY = inject(WindowScrollService).scrollY;
  protected readonly windowScrolled = computed(() => this.scrollY() > 350);

  constructor() {
    notFoundOnError(this.resource);
    const seo = inject(SeoService);
    effect(() => {
      const post = this.data()?.data;
      if (post) {
        seo.set({
          title: post.title,
          description: post.seo_description,
          keywords: post.tv_category.name,
          image: post.image?.url,
          type: 'article',
        });
      }
    });
  }

  /** Episode pagination (client-side list); keeps the scroll position. */
  protected getPage(page: number) {
    this.router.navigate([], {
      queryParams: { p: page > 1 ? page : null },
      queryParamsHandling: 'merge',
    });
  }
}
