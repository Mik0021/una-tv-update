import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
declare function destroyPlayer(): any;

@Directive({ selector: '[appRunScripts]' })
export class RunScriptsDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private platformId = inject<Object>(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.reinsertScripts();
        this.twitterScriptReupload();
        this.reinsertScriptsLivestream();
      });
    }
  }

  reinsertScripts(): void {
    const scripts = <HTMLScriptElement[]>(
      this.elementRef.nativeElement.querySelectorAll(
        ".raw-html-embed script[src='https://services.brid.tv/player/build/brid.min.js']",
      )
    );

    const scriptsInitialLength = scripts.length;
    if (scriptsInitialLength > 0) {
      for (let i = 0; i < scriptsInitialLength; i++) {
        destroyPlayer();
      }
      const script: HTMLScriptElement = scripts[0];

      if (script.parentNode !== null) {
        setTimeout(() => {
          const snipets = <HTMLScriptElement[]>(
            this.elementRef.nativeElement.querySelectorAll(
              ".raw-html-embed script[src='https://services.brid.tv/player/build/brid.min.js']",
            )
          );
          snipets.forEach((e) => {
            const snippetCopy = <HTMLScriptElement>(
              document.createElement('script')
            );

            snippetCopy.type = e.type ? e.type : 'text/javascript';
            if (e.parentElement) {
              snippetCopy.innerHTML = e.parentElement.children[2].innerHTML;
            }

            if (e.parentNode === null) {
              return;
            } else {
              e.parentNode.replaceChild(snippetCopy, e.parentNode.children[2]);
            }
          });
        });
      }
    }
  }

  twitterScriptReupload() {
    const scripts = <HTMLScriptElement[]>(
      this.elementRef.nativeElement.querySelectorAll(
        ".raw-html-embed script[src='https://platform.twitter.com/widgets.js']",
      )
    );
    const scriptsInitialLength = scripts.length;

    if (scriptsInitialLength > 0) {
      const script: HTMLScriptElement = scripts[0];
      const scriptCopy = <HTMLScriptElement>document.createElement('script');
      scriptCopy.type = script.type ? script.type : 'text/javascript';
      scriptCopy.src = script.src;
      scriptCopy.async = true;
      if (script.parentNode !== null) {
        script.parentNode.replaceChild(scriptCopy, script);
      }
    }
  }

  reinsertScriptsLivestream(): void {
    const scripts = <HTMLScriptElement[]>(
      this.elementRef.nativeElement.querySelectorAll(
        ".raw-html-embed script[src='//services.brid.tv/player/build/brid.min.js']",
      )
    );

    const scriptsInitialLength = scripts.length;
    if (scriptsInitialLength > 0) {
      for (let i = 0; i < scriptsInitialLength; i++) {
        destroyPlayer();
      }
      const script: HTMLScriptElement = scripts[0];

      if (script.parentNode !== null) {
        setTimeout(() => {
          const snipets = <HTMLScriptElement[]>(
            this.elementRef.nativeElement.querySelectorAll(
              ".raw-html-embed script[src='//services.brid.tv/player/build/brid.min.js']",
            )
          );
          snipets.forEach((e) => {
            const snippetCopy = <HTMLScriptElement>(
              document.createElement('script')
            );

            snippetCopy.type = e.type ? e.type : 'text/javascript';
            if (e.parentElement) {
              snippetCopy.innerHTML = e.parentElement.children[2].innerHTML;
            }

            if (e.parentNode === null) {
              return;
            } else {
              e.parentNode.replaceChild(snippetCopy, e.parentNode.children[2]);
            }
          });
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      destroyPlayer();
    }
  }
}
