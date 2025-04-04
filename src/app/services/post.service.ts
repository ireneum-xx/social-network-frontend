import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://127.0.0.1:8000/api/posts';

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Obtener todas las publicaciones
  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts`);
  }

  // Crear una nueva publicación
  createPost(image: File, caption: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);
  
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`);
  
    return this.http.post<any>(`${this.apiUrl}/posts`, formData, { headers });
  }

  likePost(postId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.apiUrl}/${postId}/like`, {}, { headers });
  }
  
  unlikePost(postId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete(`${this.apiUrl}/${postId}/unlike`, { headers });
  }
  
  getPostLikes(postId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${postId}/likes`);
  }

  addComment(postId: number, content: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.apiUrl}/${postId}/comments`, { content }, { headers });
  }
  
  getComments(postId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${postId}/comments`);
  }
  
  
}