import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit{

  title(title: any) {
    throw new Error('Method not implemented.');
  }
  currentModule: string = '';
  fullname: string | null = '';
  role: number | null = null;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const path = event.urlAfterRedirects.split('/')[1];
      this.currentModule = path;
    });
  }
  ngOnInit(): void {
    this.loadUser();

    // 🔑 Listen to storage changes
    window.addEventListener('storage', () => {
      this.loadUser();
    });
  }
  loadUser() {
  this.fullname = localStorage.getItem('fullname');
  this.role = Number(localStorage.getItem('role'));
}

  isAuthPage(): boolean {
    const authRoutes = ['/components/login', '/components/reset-password'];
    return authRoutes.includes(this.router.url);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // returns true if token exists
  }

  logout() {
    //localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/components/login']);
  }
}
