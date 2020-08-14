import { Component, OnInit} from '@angular/core';
import { PostService } from '../post.service';
import { BlogPost } from '../blogPost'

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit {

  blogPosts: Array<BlogPost>;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.postService.getPosts(1,null,null).subscribe(posts => {
      this.blogPosts = posts.slice(0,3);
    })
  }

  getCommentNumber(blog:BlogPost):number{
    return blog.comments.length;
  }
}
