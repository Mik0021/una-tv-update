import { ActivatedRoute } from '@angular/router';
import { StaticService } from './../../services/static.service';
import { Static } from './../../interfaces/static.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-static',
    templateUrl: './static.component.html',
    styleUrls: ['./static.component.scss'],
    standalone: false
})
export class StaticComponent implements OnInit {
  staticPage = {} as Static;
  staticPageRoute: string | null = '';
  constructor(
    private staticService: StaticService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('static')) {
        return;
      }
      this.staticPageRoute = paramMap.get('static');
      this.staticService.getStaticPage(this.staticPageRoute).subscribe({
        next: (res: Static) => {
          this.staticPage = res;
        },
        error: (error: any) => {},
      });
    });
  }

  ngOnInit(): void {}
}
