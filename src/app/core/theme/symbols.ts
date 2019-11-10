import { InjectionToken } from '@angular/core';

export const ACTIVE_THEME = new InjectionToken('ACTIVE_THEME');

export interface Theme {
  name: string;
}

export interface ThemeOptions {
  active: string;
}
