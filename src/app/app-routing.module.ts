import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BlogComponent } from "./blog/blog.component";
import { HomeComponent } from "./home/home.component";
import { PostComponent } from "./post/post.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PostTableComponent } from "./post-table/post-table.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { NewPostComponent } from "./new-post/new-post.component";


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "blog", component: BlogComponent },
  { path: "post", component: BlogComponent },
  { path: "post/:id", component: PostComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "admin", component: PostTableComponent },
  { path: "admin/newPost", component: NewPostComponent },
  { path: "admin/post/:id", component: EditPostComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}