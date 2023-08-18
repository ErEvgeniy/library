import { Component, OnInit } from '@angular/core';
import { LoaderService } from "../../../logic/services/loader.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Author, Book, Genre } from "../../../shared/model";
import { MatTableDataSource } from "@angular/material/table";
import { BookEditComponent } from "../book-edit/book-edit.component";
import { Router } from "@angular/router";
import { BookService } from "../../../logic/services/book.service";
import { AuthorService } from "../../../logic/services/author.service";
import { GenreService } from "../../../logic/services/genre.service";
import { forkJoin } from "rxjs";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  dataSource: MatTableDataSource<Book> = new MatTableDataSource([]);
  displayedColumns: Array<string> = ['id', 'name', 'genre', 'author', 'actions'];
  authors: Array<Author> = [];
  genres: Array<Genre> = [];

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private genreService: GenreService,
    private dialog: MatDialog,
    private router: Router,
    private _loader: LoaderService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.reload());
  }

  get loader(): LoaderService {
    return this._loader;
  }

  isEmptyData(): boolean {
    return !this.dataSource.data.length;
  }

  getBookAuthorFullName(author: Author): string {
    return `${author.firstname} ${author.patronymic} ${author.lastname}`;
  }

  onCreateBookClick(): void {
    this.openEditDialog();
  }

  onEditBookClick(book: Book): void {
    this.openEditDialog(book);
  }

  onDeleteBookClick(book: Book): void {
    this.bookService.deleteBook(book)
      .subscribe(() => {
        this.reload();
      }, () => {
        this.loader.hide();
      });
  }

  onCommentsBookClick(book: Book): void {
    this.router.navigateByUrl(`/comment-list/${book.id}`);
  }

  openEditDialog(book?: Book): void {
    const dialogConf = new MatDialogConfig();
    dialogConf.autoFocus = false;
    dialogConf.hasBackdrop = true;
    dialogConf.disableClose = true;
    dialogConf.width = '1000px';
    dialogConf.data = {
      authors: this.authors,
      genres: this.genres,
    };
    if (book) {
      dialogConf.data['book'] = book;
    }

    const dialogRef = this.dialog.open(BookEditComponent, dialogConf);
    dialogRef.afterClosed().subscribe(data => {
      if (data && data.needReload) this.reload();
    });
  }

  reload(): void {
    this.loader.show();
    this.dataSource.data = [];

    const bookList$ = this.bookService.getBookList();
    const authorList$ = this.authorService.getAuthorList();
    const genreList$ = this.genreService.getGenreList();

    forkJoin([bookList$, authorList$, genreList$]).subscribe(
      (data: any[]) => {
        this.dataSource.data = data[0] as Array<Book>;
        this.authors = data[1] as Array<Author>;
        this.genres = data[2] as Array<Genre>;
        this.loader.hide();
      },
      (error: any) => {
        console.error(error);
        this.loader.hide();
      }
    );
  }

}
