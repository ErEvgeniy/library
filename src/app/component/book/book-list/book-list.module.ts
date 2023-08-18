import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../shared/shared.module";
import { BookListComponent } from "./book-list.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    BookListComponent,
  ]
})
export class BookListModule { }
