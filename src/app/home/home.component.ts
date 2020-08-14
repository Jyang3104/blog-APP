import { Component, OnInit } from '@angular/core';
import { BlogPost } from "../blogPost";
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../post.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogPosts: Array<BlogPost>;
  querySub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe( params => {
      this.postService.getPosts(1,null,null).subscribe(data => this.blogPosts = data.slice(2,5))
    })
  }

}
