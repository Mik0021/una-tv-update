import { Component, Inject, OnInit, DOCUMENT } from '@angular/core';
import { Observable } from 'rxjs';
import { TvProgram } from './../interfaces/tv-program.model';
import { TvProgramService } from './../services/tv-program.service';
import { Meta, Title } from '@angular/platform-browser';


@Component({
    selector: 'app-program',
    templateUrl: './program.component.html',
    styleUrls: ['./program.component.scss'],
    standalone: false
})
export class ProgramComponent implements OnInit {
  showTab: boolean = true;
  schemaComplete = {} as TvProgram;
  schemaCompleteBih = {} as TvProgram;
  tvProgram$: Observable<TvProgram> = this.tvProgramService.tvProgram$;
  // tvProgramBih$: Observable<TvProgram> = this.tvProgramService.tvProgramBih$;
  constructor(
    private tvProgramService: TvProgramService,
    private metaService: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private _document: Document,
  ) {}
  ngOnInit(): void {
    this.tvProgramService.getTvProgram();
    // this.tvProgramService.getTvProgramBih();
    this.addTags();
    this.tvProgram$.subscribe({
      next: (res) => {
        this.schemaComplete = res;
        for (let i = 0; i < this.schemaComplete.data.length; i++) {
          i === 0
            ? (this.schemaComplete.data[i].active = true)
            : (this.schemaComplete.data[i].active = false);
        }
      },
    });
    // this.tvProgramBih$.subscribe({
    //   next: (res) => {
    //     this.schemaCompleteBih = res;
    //     for (let i = 0; i < this.schemaCompleteBih.data.length; i++) {
    //       i === 0
    //         ? (this.schemaCompleteBih.data[i].active = true)
    //         : (this.schemaCompleteBih.data[i].active = false);
    //     }
    //   },
    // });
  }

  addTags() {
    this.titleService.setTitle('UNA TV PROGRAM');
    this.metaService.updateTag({
      name: 'description',
      content: 'Pogledajte program UNA TELEVIZIJE',
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'program, una tv',
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: 'Una tv program',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Pogledajte program UNA TELEVIZIJE',
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
      content: 'Una tv program',
    });
    this.metaService.updateTag({
      name: 'twitter:description',
      content: 'Pogledajte program UNA TELEVIZIJE',
    });
    this.metaService.updateTag({
      name: 'twitter:image',
      content: 'https://una-test-images.ha.rs/storage/images/2022/09/una.webp',
    });
  }
}
