import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ApiOfflineBannerComponent } from './shared/components/api-offline-banner/api-offline-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ApiOfflineBannerComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'amazon-frontend';

  ngOnInit(): void {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }
}
