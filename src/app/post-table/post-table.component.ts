import { Component, OnInit } from "@angular/core";
import { BlogPost } from "../blogPost";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";


@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css']
})
export class PostTableComponent implements OnInit {
  
  allPosts: BlogPost[] = [];
  querySub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe( params => {
      this.postService.getAllPosts().subscribe(data => this.allPosts = data)
    })
  }
  
  ngOnDestroy(): void {
    this.querySub.unsubscribe();
  }

  rowClick(id: string): void {
      this.router.navigate(['/admin/post', id]);
  }
 
}