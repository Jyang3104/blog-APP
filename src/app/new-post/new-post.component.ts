import { Component, OnInit } from "@angular/core";
import { BlogPost } from "../blogPost";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  blogPost: BlogPost = new BlogPost();
  querySub: Subscription;
  tags: string;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm): void {

    console.log(this.blogPost.title);
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toLocaleDateString();
    this.blogPost.postedBy = "WEB422 STUDENT"
    this.blogPost.views = 0;
    
    this.postService.newPost(this.blogPost).subscribe(() => {
      this.router.navigate(['/admin']);
    })
    
  }

}
