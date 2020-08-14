import { Component, OnInit } from "@angular/core";
import { BlogPost } from "../blogPost";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost: BlogPost = new BlogPost();
  tags: string;
  querySub: Subscription;


  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe((params) => {
      this.postService
        .getPostbyId(params.id)
        .subscribe((data) => {
          this.blogPost = data;
          this.tags = data.tags.toString();
         
          console.log(data.title);
        });
    });
  }

  onSubmit(form:NgForm): void {

    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    
    this.postService.updatePostById(this.blogPost._id,this.blogPost).subscribe(() => {
      this.router.navigate(['/admin']);
    })
    
  }

  deletePost(): void {
    this.postService.deletePostById(this.blogPost._id).subscribe(() => {
      this.router.navigate(['/admin']);
    })
}

}
