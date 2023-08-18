import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './shared/layout/wrapper.component';
import { BookListComponent } from "./component/book/book-list/book-list.component";
import { CommentListComponent } from "./component/comment/comment-list/comment-list.component";
import { AuthorListComponent } from "./component/author/author-list/author-list.component";
import { GenreListComponent } from "./component/genre/genre-list/genre-list.component";
import { MainComponent } from "./component/main/main.component";

const appRoutes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        component: MainComponent
      },
      {
        path: 'book-list',
        component: BookListComponent
      },
      {
        path: 'comment-list/:bookId',
        component: CommentListComponent
      },
      {
        path: 'author-list',
        component: AuthorListComponent
      },
      {
        path: 'genre-list',
        component: GenreListComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/main',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
