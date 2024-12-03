import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shopapp-frontend';

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    const htmlElement = document.documentElement;
    if (localStorage.getItem("theme") === "dark") {
      htmlElement.classList.add("dark");
    } 

    initFlowbite();

  }
}
