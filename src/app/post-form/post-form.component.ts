import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.css"],
})
export class PostFormComponent implements OnInit {
  postForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    postBy: new FormControl("", [Validators.required]),
    post: new FormControl("", [Validators.required]),
    category: new FormControl(""),
  });

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    const form = this.postForm;
    console.log(form.value);
  }
}