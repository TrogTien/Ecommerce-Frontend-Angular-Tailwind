import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private readonly _darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this._darkModeSubject.asObservable();

  constructor() { 
    const isDarkMode = localStorage.getItem("theme") === "dark";
    this._darkModeSubject.next(isDarkMode);
    this.updateTheme();
  }

  toggleTheme() {
    const currentState = this._darkModeSubject.getValue();
    this._darkModeSubject.next(!currentState);
    this.updateTheme();
  }

  updateTheme() {
    const htmlElement = document.documentElement;

    if (this._darkModeSubject.getValue()) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }
}
