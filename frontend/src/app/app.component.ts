import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule], // 👈 This line is the fix!
  templateUrl: './app.component.html'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  currentModule: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const path = event.urlAfterRedirects.split('/')[1];
      this.currentModule = path;
    });
  }
  isAuthPage(): boolean {
    const authRoutes = ['/components/login', '/components/reset-password'];
    return authRoutes.includes(this.router.url);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // returns true if token exists
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/components/login']);
  }
}
