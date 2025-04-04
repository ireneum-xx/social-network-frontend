import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  standalone: false,
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  selectedFile: File | null = null;
  caption: string = '';
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
    this.loadLikes();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  createPost() {
    if (this.selectedFile) {
      this.postService.createPost(this.selectedFile, this.caption).subscribe(() => {
        this.loadPosts();
        this.selectedFile = null;
        this.caption = '';
      });
    }
  }

  toggleLike(post: any) {
    if (post.liked) {
      this.postService.unlikePost(post.id).subscribe(() => {
        post.liked = false;
        post.likes--;
      });
    } else {
      this.postService.likePost(post.id).subscribe(() => {
        post.liked = true;
        post.likes++;
      });
    }
  }
  
  loadLikes() {
    this.posts.forEach(post => {
      this.postService.getPostLikes(post.id).subscribe(data => {
        post.likes = data.likes;
      });
    });
  }

  loadComments(post: any) {
    this.postService.getComments(post.id).subscribe(data => {
      post.comments = data;
    });
  }
  
  addComment(post: any) {
    if (post.newComment) {
      this.postService.addComment(post.id, post.newComment).subscribe(() => {
        this.loadComments(post);
        post.newComment = '';
      });
    }
  }
  

  
  
}