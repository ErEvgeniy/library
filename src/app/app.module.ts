import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './logic/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorListModule } from "./component/author/author-list/author-list.module";
import { AuthorEditModule } from "./component/author/author-edit/author-edit.module";
import { GenreListModule } from "./component/genre/genre-list/genre-list.module";
import { GenreEditModule } from "./component/genre/genre-edit/genre-edit.module";
import { BookListModule } from "./component/book/book-list/book-list.module";
import { BookEditModule } from "./component/book/book-edit/book-edit.module";
import { CommentListModule } from "./component/comment/comment-list/comment-list.module";
import { CommentEditModule } from "./component/comment/comment-edit/comment-edit.module";
import { AuthorEditComponent } from "./component/author/author-edit/author-edit.component";
import { GenreEditComponent } from "./component/genre/genre-edit/genre-edit.component";
import { BookEditComponent } from "./component/book/book-edit/book-edit.component";
import { CommentEditComponent } from "./component/comment/comment-edit/comment-edit.component";
import { MainModule } from "./component/main/main.module";

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    AuthorListModule,
    AuthorEditModule,
    GenreListModule,
    GenreEditModule,
    BookListModule,
    BookEditModule,
    CommentListModule,
    CommentEditModule,
    MainModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AuthorEditComponent,
    GenreEditComponent,
    BookEditComponent,
    CommentEditComponent,
  ]
})
export class AppModule { }
