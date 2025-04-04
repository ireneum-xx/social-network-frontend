import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';  // Para redirigir después del logout

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Método para la redirección
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    const token = localStorage.getItem('token');
    
    // Verificamos si el token existe antes de proceder con el logout
    if (token) {
      this.authService.logout(token).subscribe(
        () => {
          // Eliminar el token del localStorage
          localStorage.removeItem('token');
          // Redirigir al login después de hacer logout
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error en el logout', error);
        }
      );
    } else {
      console.warn('No hay token disponible para hacer logout');
    }
  }
}