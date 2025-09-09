import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-reset-password',
  imports: [SharedModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  token = '';
  username = '';
  message = '';
  error = '';
  success: any;

  constructor(private fb: FormBuilder, private cs: CommonService, private router: Router) {
    this.resetForm = this.fb.group({
      username: ['', Validators.required],
       newPassword: ['', Validators.required],
       confirmPassword: ['', Validators.required]
    });
  }

  // reset() {
  // if (this.resetForm.valid) {
  //   const payload = {
  //     username: this.username, // from query param
  //     token: this.token,       // from query param
  //     newPassword: this.resetForm.value.newPassword
  //   };

  //   this.cs.resetPassword(payload).subscribe({
  //     next: (res: any) => {
  //       this.message = res.message;
  //       setTimeout(() => this.router.navigate(['/login']), 2000);
  //     },
  //     error: (err) => {
  //       this.error = err.error?.error || 'Reset failed';
  //     }
  //   });
  // }
  // }
   submit() {
    if (this.resetForm.invalid) {
      this.error = 'All fields are required';
      return;
    }

    const { username, newPassword, confirmPassword } = this.resetForm.value;

    if (newPassword !== confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.cs.resetPassword({ username, newPassword }).subscribe({
      next: (res: any) => {
        this.success = res.message;
        this.error = '';
        setTimeout(() => this.router.navigate(['/components/login']), 2000);
      },
      error: (err) => {
        this.error = err.error?.error || 'Reset failed';
        this.success = '';
      }
    });
  }


}
