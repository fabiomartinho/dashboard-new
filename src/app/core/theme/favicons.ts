import { Inject } from '@angular/core';
import { InjectionToken } from '@angular/core';

export interface FaviconsConfig {
  cacheBusting?: boolean;
}

export const BROWSER_FAVICONS_CONFIG = new InjectionToken<FaviconsConfig>('Favicons Configuration');

export abstract class Favicons {
  abstract activate(name: string): void;
}

export class BrowserFavicons implements Favicons {

  private elementId: string;
  private useCacheBusting: boolean;

  constructor(@Inject(BROWSER_FAVICONS_CONFIG) config: FaviconsConfig) {
    this.elementId = 'favicons-service-injected-node';
    this.useCacheBusting = (config.cacheBusting || false);
    this.removeExternalLinkElements();
  }

  public activate(href: string): void {
    this.setNode(href);
  }

  private addNode(href: string): void {
    const linkElement = document.createElement('link');
    linkElement.setAttribute('id', this.elementId);
    linkElement.setAttribute('rel', 'icon');
    linkElement.setAttribute('type', 'image/png');
    linkElement.setAttribute('href', href);
    document.head.appendChild(linkElement);
  }

  private cacheBustHref(href: string): string {
    const augmentedHref = (href.indexOf('?') === -1)
      ? `${href}?faviconCacheBust=${Date.now()}`
      : `${href}&faviconCacheBust=${Date.now()}`
      ;
    return (augmentedHref);
  }

  private removeExternalLinkElements(): void {
    const linkElements = document.querySelectorAll('link[ rel ~= "icon" i]');
    for (const linkElement of Array.from(linkElements)) {
      linkElement.parentNode.removeChild(linkElement);
    }
  }

  private removeNode(): void {
    const linkElement = document.head.querySelector('#' + this.elementId);
    if (linkElement) {
      document.head.removeChild(linkElement);
    }
  }

  private setNode(href: string): void {
    const augmentedHref = this.useCacheBusting
      ? this.cacheBustHref(href)
      : href
      ;
    this.removeNode();
    this.addNode(augmentedHref);
  }

}
