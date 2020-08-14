import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs';
import { BlogPost } from "./blogPost";

const perPage = 6;
@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiUrl:string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getPosts(page:number, tag:string, category:string): Observable<BlogPost[]> {

    if (tag) {
      return this.http.get<BlogPost[]>(`${this.apiUrl}/posts?page=${page}&perPage=${perPage}&tag=${tag}`);
    } else if (category) {
      return this.http.get<BlogPost[]>(`${this.apiUrl}/posts?page=${page}&perPage=${perPage}&category=${category}`);
    } else {
      return this.http.get<BlogPost[]>(`${this.apiUrl}/posts?page=${page}&perPage=${perPage}`);
    }
     
  }

 

  getPostbyId(id:string): Observable<BlogPost>{

    return this.http.get<BlogPost>(`${this.apiUrl}/posts/${id}`);
  }

  getCategories(): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/categories`);
  }

  getTags(): Observable<string[]> {

    return this.http.get<string[]>(`${this.apiUrl}/tags`);
  }

  getAllPosts(): Observable<BlogPost[]> {

    return this.http.get<BlogPost[]>(`${this.apiUrl}/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`);
  }

  newPost(data: BlogPost): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/posts`, data);
  }
  
  updatePostById(id: string, data: BlogPost): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/posts/${id}`);
  }

}
