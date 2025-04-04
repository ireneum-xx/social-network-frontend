import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;
  posts: any[] = [];
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Verificar si el usuario está logueado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);  // Redirigir a la página de login si no está logueado
    } else {
      this.loadUserProfile();
      this.loadPosts();
    }
  }

  // Cargar el perfil del usuario
  loadUserProfile(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getProfile(token).subscribe(
        (response) => {
          this.user = response.user; // Asegúrate de que la respuesta tiene la estructura correcta
        },
        (error) => {
          this.errorMessage = 'No se pudo cargar el perfil del usuario';
          console.error('Error al cargar perfil', error);
        }
      );
    }
  }

  // Obtener publicaciones
  loadPosts(): void {
    this.postService.getPosts().subscribe(
      (response) => {
        this.posts = response.data;
      },
      (error) => {
        this.errorMessage = 'No se pudieron cargar las publicaciones';
        console.error('Error al cargar publicaciones', error);
      }
    );
  }

  // Cerrar sesión
  logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.logout(token).subscribe(
        () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']); // Redirigir a login
        },
        (error) => {
          this.errorMessage = 'Error al cerrar sesión';
          console.error('Error al cerrar sesión', error);
        }
      );
    }
  }
}