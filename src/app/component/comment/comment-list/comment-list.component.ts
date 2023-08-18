import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LoaderService } from "../../../logic/services/loader.service";
import { CommentService } from "../../../logic/services/comment.service";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { CommentEditComponent } from "../comment-edit/comment-edit.component";
import { Comment } from "../../../shared/model";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  dataSource: MatTableDataSource<Comment> = new MatTableDataSource([]);
  displayedColumns: Array<string> = ['id', 'text', 'actions'];

  constructor(
    private commentService: CommentService,
    private dialog: MatDialog,
    private _loader: LoaderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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

  onCreateCommentClick(): void {
    this.openEditDialog();
  }

  onToBookListClick() {
    this.router.navigateByUrl('/book-list');
  }

  onEditCommentClick(comment: Comment): void {
    this.openEditDialog(comment);
  }

  onDeleteCommentClick(comment: Comment): void {
    this.commentService.deleteComment(comment)
      .subscribe(() => {
        this.reload();
      }, () => {
        this.loader.hide();
      });
  }

  openEditDialog(comment?: Comment): void {
    const dialogConf = new MatDialogConfig();
    dialogConf.autoFocus = false;
    dialogConf.hasBackdrop = true;
    dialogConf.disableClose = true;
    dialogConf.width = '1000px';
    dialogConf.data = {
      comment: comment ? comment : null,
      bookId: this.activatedRoute.snapshot.paramMap.get('bookId'),
    };

    const dialogRef = this.dialog.open(CommentEditComponent, dialogConf);
    dialogRef.afterClosed().subscribe(data => {
      if (data && data.needReload) this.reload();
    });
  }

  reload(): void {
    this.loader.show();
    this.dataSource.data = [];

    const bookId = this.activatedRoute.snapshot.paramMap.get('bookId');

    this.commentService.getCommentsByBook(bookId)
      .subscribe((data) => {
        this.dataSource.data = data;
        this.loader.hide();
      }, () => {
        this.loader.hide();
      });
  }

}
