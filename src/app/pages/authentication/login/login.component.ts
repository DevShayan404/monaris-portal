import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      if (
        this.authService.login(
          this.loginForm.value.userName,
          this.loginForm.value.password
        )
      ) {
        localStorage.setItem('user', this.loginForm.value.userName);
        this.router.navigate(['portal/dashboard']);
      }
    } else {
      Object.keys(this.loginForm.controls).forEach((controlName) => {
        const control = this.loginForm.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  isControlInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && control?.touched;
  }
}
