import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showConfirmPassword = false;
  returnUrl = '/';

  loginData = { email: '', password: '' };
  registerData = { fullName: '', email: '', password: '', confirmPassword: '', phone: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoginMode = this.router.url.includes('login');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.successMessage = '';
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  isLoginValid(): boolean {
    return !!this.loginData.email && !!this.loginData.password;
  }

  isRegisterValid(): boolean {
    return !!(
      this.registerData.fullName &&
      this.registerData.email &&
      this.isValidEmail(this.registerData.email) &&
      this.registerData.password &&
      this.registerData.password.length >= 6 &&
      this.registerData.password === this.registerData.confirmPassword
    );
  }

  getPasswordStrength(): { width: string; color: string; label: string } {
    const p = this.registerData.password;
    let strength = 0;
    if (p.length >= 6) strength++;
    if (p.length >= 8) strength++;
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) strength++;
    if (/[^A-Za-z0-9]/.test(p)) strength++;
    const levels = [
      { width: '25%', color: '#f44336', label: 'Weak' },
      { width: '50%', color: '#ff9800', label: 'Fair' },
      { width: '75%', color: '#2196f3', label: 'Good' },
      { width: '100%', color: '#4caf50', label: 'Strong' }
    ];
    return levels[Math.min(strength - 1, 3)] || { width: '0%', color: '', label: '' };
  }

  onLogin() {
    if (!this.isLoginValid()) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate([this.returnUrl]);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Invalid email or password.';
      }
    });
  }

  onRegister() {
    if (!this.isRegisterValid()) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.authService.register(
      this.registerData.fullName,
      this.registerData.email,
      this.registerData.password,
      this.registerData.phone
    ).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate([this.returnUrl]);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}