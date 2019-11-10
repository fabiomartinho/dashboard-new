import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemeService } from './theme.service';
import { Theme } from './symbols';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnInit, OnDestroy {

  private _destroy$ = new Subject();

  constructor(
    private _elementRef: ElementRef,
    private _themeService: ThemeService,
    private overlayContainer: OverlayContainer
  ) { }

  ngOnInit() {
    const active = this._themeService.getActiveTheme();
    if (active) {
      this.updateTheme(active);
    }
    this._themeService.themeChange
      .pipe(takeUntil(this._destroy$))
      .subscribe((theme: Theme) => this.updateTheme(theme));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  updateTheme(theme: Theme) {
    this._elementRef.nativeElement.classList.remove(`${name}-theme`);
    this._elementRef.nativeElement.classList.remove('basic-theme');
    this._elementRef.nativeElement.classList.add(`${theme.name}-theme`);
    const classList = this.overlayContainer.getContainerElement().classList;
    classList.add(`${theme.name}-theme`);
  }

}
