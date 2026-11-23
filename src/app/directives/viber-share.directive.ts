import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

@Directive({ selector: '[appViberShare]' })
export class ViberShareDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setViberLink();
    }
  }

  setViberLink() {
    const linkElem = <HTMLLinkElement>this.elementRef.nativeElement;
    let text = document
      .querySelector("[name='og:title']")
      ?.getAttribute('content');
    linkElem.setAttribute(
      'href',
      'viber://forward?text=' + encodeURIComponent(window.location.href)
    );
  }
}
