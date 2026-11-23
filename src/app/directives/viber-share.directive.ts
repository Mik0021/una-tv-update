import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, OnInit, PLATFORM_ID, inject } from '@angular/core';

@Directive({ selector: '[appViberShare]' })
export class ViberShareDirective implements OnInit {
  private elementRef = inject(ElementRef);
  private platformId = inject<Object>(PLATFORM_ID);

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
