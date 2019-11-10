import { Injectable, Inject, EventEmitter } from '@angular/core';
import { ACTIVE_THEME, Theme } from './symbols';

@Injectable()
export class ThemeService {

  themeChange = new EventEmitter<Theme>();

  constructor(
    @Inject(ACTIVE_THEME) public theme: string
  ) {
  }

  getTheme(name: string): Theme {
    return { name: name };
  }

  getActiveTheme() {
    return this.getTheme(this.theme);
  }

  setTheme(name: string) {
    this.theme = name;    
    this.themeChange.emit(this.getActiveTheme());
  }

  updateTheme(name: string) {
    const theme = this.getTheme(name);
    if (name === this.theme) {
      this.themeChange.emit(theme);
    }
  }

}
