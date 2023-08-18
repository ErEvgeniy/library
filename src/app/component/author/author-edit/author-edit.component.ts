import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Author } from "../../../shared/model";
import { LoaderService } from "../../../logic/services/loader.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthorService } from "../../../logic/services/author.service";
import { Action } from "../../../shared/constant";

@Component({
  selector: 'app-author-edi',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent {

  editForm: FormGroup = new FormGroup({});
  action: Action;

  constructor(
    private loader: LoaderService,
    private authorService: AuthorService,
    private dialogRef: MatDialogRef<AuthorEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      author: Author
    },
  ) {
    this.action = data.author ? Action.Edit : Action.Create;
    this.initializeForm(data.author);
  }

  initializeForm(data: Author): void {
    this.editForm.addControl('id', new FormControl({
      value: data ? data.id : null,
      disabled: true,
    }));
    this.editForm.addControl('firstname', new FormControl({
      value: data ? data.firstname : null,
      disabled: false,
    }));
    this.editForm.addControl('patronymic', new FormControl({
      value: data ? data.patronymic : null,
      disabled: false,
    }));
    this.editForm.addControl('lastname', new FormControl({
      value: data ? data.lastname : null,
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

  onSaveClick(): void {
    const form = this.editForm;
    const loader = this.loader;

    if (form.valid) {
      form.disable();
      loader.show();

      const request = (data) => this.isEditMode ?
        this.authorService.updateAuthor(data) : this.authorService.createAuthor(data);

      request(this.editForm.value)
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
