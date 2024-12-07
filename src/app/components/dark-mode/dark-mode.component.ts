import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss']
})
export class DarkModeComponent implements OnInit, OnDestroy {
  private darkModeSubscription!: Subscription;
  isDarkMode: boolean = false;

  constructor(private darkModeService: DarkModeService) {}
  
  
  ngOnInit(): void {
    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe(darkModeState => {
      this.isDarkMode = darkModeState;
    })
  }

  

  toggleTheme() {
    this.darkModeService.toggleTheme();
  }

  ngOnDestroy(): void {
    this.darkModeSubscription.unsubscribe();
  }
  
}
