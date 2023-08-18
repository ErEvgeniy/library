import { Component, Inject } from '@angular/core';
import { LoaderService } from "../../../logic/services/loader.service";
import { BookService } from "../../../logic/services/book.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Author, Book, Genre } from "../../../shared/model";
import { FormControl, FormGroup } from "@angular/forms";
import { Action } from "../../../shared/constant";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent {

  editForm: FormGroup = new FormGroup({});
  action: Action;

  constructor(
    private loader: LoaderService,
    private bookService: BookService,
    private dialogRef: MatDialogRef<BookEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      book: Book,
      authors: Array<Author>,
      genres: Array<Genre>,
    },
  ) {
    this.action = data.book ? Action.Edit : Action.Create;
    this.initializeForm(data.book);
  }

  initializeForm(data: Book): void {
    this.editForm.addControl('id', new FormControl({
      value: data ? data.id : null,
      disabled: true,
    }));
    this.editForm.addControl('name', new FormControl({
      value: data ? data.name : null,
      disabled: false,
    }));
    this.editForm.addControl('author', new FormControl({
      value: data ? data.author.id : null,
      disabled: false,
    }));
    this.editForm.addControl('genre', new FormControl({
      value: data ? data.genre.id : null,
      disabled: false,
    }));
  };

  get disableSaveButton(): boolean {
    return this.editForm.invalid || this.editForm.disabled
      || this.editForm.untouched || this.editForm.pristine;
  }

  get isEditMode(): boolean {
    return this.action === Action.Edit;
  }

  get authors(): Array<Author> {
    return this.data.authors;
  }

  get genres(): Array<Genre> {
    return this.data.genres;
  }

  getFullName(author: Author) {
    return `${author.firstname} ${author.patronymic} ${author.lastname}`;
  }

  onSaveClick(): void {
    const form = this.editForm;
    const loader = this.loader;

    if (form.valid) {
      form.disable();
      loader.show();

      const request = (data) => this.isEditMode ?
        this.bookService.updateBook(data) : this.bookService.createBook(data);

      const book: Book = this.editForm.value;
      book.author = this.authors.find(a => a.id === this.editForm.value.author);
      book.genre = this.genres.find(g => g.id === this.editForm.value.genre);

      request(book)
        .subscribe(() => {
          loader.hide();
          this.onCancelClick(true);
        }, () => {
          loader.hide();
          form.enable();
        });
    }
  }

  onCancelClick(v: boolean = false): void {
    this.dialogRef.close({needReload: v});
  }

}
