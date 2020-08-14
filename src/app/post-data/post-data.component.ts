import { Component, OnInit } from "@angular/core";
import { BlogPost } from "../blogPost";
import { ActivatedRoute, Params } from "@angular/router";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-post-data",
  templateUrl: "./post-data.component.html",
  styleUrls: ["./post-data.component.css"],
})
export class PostDataComponent implements OnInit {
  querySub: Subscription;
  post: BlogPost = new BlogPost();
  commentName: string;
  commentText: string;
  commentNo: number;
  
  
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe((params) => {
      this.postService
        .getPostbyId(params.id)
        .subscribe((data) => {
          this.post = data;
          this.commentNo = this.post.comments.length;
          this.post.views++; 

          this.postService.updatePostById(this.post._id, this.post).subscribe();
        });
    });
  }
  ngOnDestroy(): void {
    if (this.querySub) this.querySub.unsubscribe();
  }

  submitComment(form:NgForm): void {

    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString()
    })
    
    this.postService.updatePostById(this.post._id,this.post).subscribe(() => {
      this.commentName = "";
      this.commentText = "";
      this.commentNo = this.post.comments.length;
    })
    
  }
}