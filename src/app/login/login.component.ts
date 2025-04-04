import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login(): void {
    if (this.loginForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso', response);

        // Guardar el token en localStorage
        localStorage.setItem('token', response.token);

        // Redirigir al usuario
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error en el inicio de sesión', error);
      }
    );
  }
}