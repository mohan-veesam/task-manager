// app.routes.ts
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'components/login',  // Optional default route
    pathMatch: 'full'
  },
  {
    path: 'components',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'dashboard', component: DashboardComponent,},
      { path: 'user', component: UserComponent, canActivate: [authGuard], data: { roles: [1] } },
      { path: 'projects', component: ProjectsComponent, canActivate: [authGuard], data: { roles: [1, 2] } },
      { path: 'tasks', component: TasksComponent },     
    ]
  }
];

export const appRouterProviders = [provideRouter(routes)];
