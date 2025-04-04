import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: false,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    // Verificar que los campos no estén vacíos
    if (this.name && this.email && this.password) {
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      // Llamar al servicio de autenticación para registrar al usuario
      this.authService.register(formData).subscribe(
        (response) => {
          console.log('Usuario registrado con éxito', response);
          // Redirigir al login o a la home
          localStorage.setItem('token', response.token); // Guardar el token
          this.router.navigate(['/home']); // Redirigir a la página principal
        },
        (error) => {
          console.error('Error en el registro', error);
        }
      );
    } else {
      console.error('Por favor, complete todos los campos');
    }
  }
}