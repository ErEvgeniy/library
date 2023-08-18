import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { LoaderService } from "../../../logic/services/loader.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Genre } from "../../../shared/model";
import { GenreService } from "../../../logic/services/genre.service";
import { Action } from "../../../shared/constant";

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.scss']
})
export class GenreEditComponent {

  editForm: FormGroup = new FormGroup({});
  action: Action;

  constructor(
    private loader: LoaderService,
    private genreService: GenreService,
    private dialogRef: MatDialogRef<GenreEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      genre: Genre
    },
  ) {
    this.action = data.genre ? Action.Edit : Action.Create;
    this.initializeForm(data.genre);
  }

  initializeForm(data: Genre): void {
    this.editForm.addControl('id', new FormControl({
      value: data ? data.id : null,
      disabled: true,
    }));
    this.editForm.addControl('name', new FormControl({
      value: data ? data.name : null,
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
        this.genreService.updateGenre(data) : this.genreService.createGenre(data);

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
