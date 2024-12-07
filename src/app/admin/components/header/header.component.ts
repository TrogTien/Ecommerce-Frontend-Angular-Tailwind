import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  sidebarState: boolean = false;
  isDarkMode: boolean = false;

  isDropDowns = [false, false, false];
  isSeenList = [false, false, false];



  private destroy$ = new Subject<void>;

  constructor(
    private sidebarService: SidebarService,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.sidebarService.sidebarState$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(_sidebarState => {
      this.sidebarState = _sidebarState;
    })

    this.darkModeService.darkMode$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(_darkModeState => {
      this.isDarkMode = _darkModeState;
    })


  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleTheme();
  }

  

  openDropDown(index: number): void {
    const currentState = this.isDropDowns[index];
    this.isDropDowns[index] = !currentState;
    this.isSeenList[index] = true;
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
