import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { UserFormComponent } from '../user/user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private cs: CommonService, private router: Router, private dialog : MatDialog,) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    
  }

  login() {
  if (this.loginForm.valid) {
    this.cs.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('fullname', res.fullname);
        localStorage.setItem('username', res.username);
        localStorage.setItem('id', res.id);
        // 🔑 Immediately update fullname in AppComponent
        window.dispatchEvent(new Event('storage'));

        this.router.navigate(['/components/dashboard']) },
      error: (err) => {
        this.error = err.error?.error || 'Login failed';
      }
    });
  }
  }

  openSignup(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: {
        mode: 'A',
        user: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Optional: Show success snackbar or auto-login or message
        console.log('User signed up successfully');
      }
    });
  }

  
}
