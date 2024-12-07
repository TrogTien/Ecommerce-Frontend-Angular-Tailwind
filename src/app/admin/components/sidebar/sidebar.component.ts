import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private sidebarSubscription!: Subscription ;
  sidebarToggle: boolean = false;
  

  isOpenDashboard = false;
  isOpenForm = false;

  constructor(private sidebarService: SidebarService) {}
  

  ngOnInit(): void {
    this.sidebarSubscription = this.sidebarService.sidebarState$.subscribe(sidebarState => {
      this.sidebarToggle = sidebarState;
    })
  }

  toggle(): void {
    this.sidebarService.toggleSidebar();
  }

  toggleSubMenu(name: string): void {
    if (name === "dashboard") {
      this.isOpenDashboard = !this.isOpenDashboard
    } else if (name === "forms") {
      this.isOpenForm = !this.isOpenForm;
    }
  }

  ngOnDestroy(): void {
    this.sidebarSubscription?.unsubscribe()
  }
}
