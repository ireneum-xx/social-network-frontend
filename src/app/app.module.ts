import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar FormsModule y ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Para formularios basados en plantillas
    ReactiveFormsModule // Para formularios reactivos
  ],
  providers: [AuthService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }