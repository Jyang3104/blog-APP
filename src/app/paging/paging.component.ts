import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() page: number;
  @Output() newPage: EventEmitter<number> = new EventEmitter();

  onLeftSelected(): void{
    this.newPage.emit(this.page>1?(this.page-1):this.page);
  }
  onRightSelected(): void{
    this.newPage.emit((this.page+1));
  }
  constructor() { }

  ngOnInit(): void {
  }

}
