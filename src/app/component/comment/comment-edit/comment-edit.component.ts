import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { LoaderService } from "../../../logic/services/loader.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Comment } from "../../../shared/model";
import { CommentService } from "../../../logic/services/comment.service";
import { Action } from "../../../shared/constant";

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent {

  editForm: FormGroup = new FormGroup({});
  action: Action;

  constructor(
    private loader: LoaderService,
    private commentService: CommentService,
    private dialogRef: MatDialogRef<CommentEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      comment: Comment
      bookId: string
    },
  ) {
    this.action = data.comment ? Action.Edit : Action.Create;
    this.initializeForm(data.comment);
  }

  initializeForm(data: Comment): void {
    this.editForm.addControl('id', new FormControl({
      value: data ? data.id : null,
      disabled: true,
    }));
    this.editForm.addControl('text', new FormControl({
      value: data ? data.text : null,
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
        this.commentService.updateComment(data) : this.commentService.createComment(data);

      const comment: Comment = this.editForm.value;
      comment.bookId = this.data.bookId;

      request(comment)
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
