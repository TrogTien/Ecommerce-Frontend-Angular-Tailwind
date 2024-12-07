import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly _sidebarState = new BehaviorSubject<boolean>(false);
  sidebarState$ = this._sidebarState.asObservable();

  constructor() { }

  toggleSidebar(): void {
    const currentState = this._sidebarState.getValue();
    this._sidebarState.next(!currentState);
  }
}
