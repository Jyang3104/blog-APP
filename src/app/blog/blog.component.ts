import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../blogPost';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../post.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  
  blogPosts: Array<BlogPost>;
  page: number = 1;
  tag: string = '';
  category: string = '';
  querySub: Subscription;

  constructor(
    private route:ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if(params['tag']){
        this.tag = params['tag'];
        this.category = null;
      }else{
        this.tag = null;
      }

      if(params['category']){
        this.category = params['category'];
        this.tag = null;
      }else{
        this.category = null;
      }
      this.getPage(+params['page'] || 1);
    })
  }

  getPage(num:number): void{
      this.postService.getPosts(num,this.tag,this.category).subscribe(posts => {
        if(posts.length>0){
          this.blogPosts = posts;
          this.page = num;
        }else{
          console.log("no return");
        }
      })

  }
  changePage(page:number):void{
    this.getPage(page);
  }
  ngOnDestroy():void{
    if(this.querySub) this.querySub.unsubscribe();
  }

}
