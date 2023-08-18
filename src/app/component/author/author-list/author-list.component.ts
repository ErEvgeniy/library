import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LoaderService } from "../../../logic/services/loader.service";
import { AuthorService } from "../../../logic/services/author.service";
import { Author } from "../../../shared/model";
import { MatTableDataSource } from "@angular/material/table";
import { AuthorEditComponent } from "../author-edit/author-edit.component";

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {

  dataSource: MatTableDataSource<Author> = new MatTableDataSource([]);
  displayedColumns: Array<string> = ['id', 'firstname', 'patronymic', 'lastname', 'actions'];

  constructor(
    private authorService: AuthorService,
    private dialog: MatDialog,
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

  onCreateAuthorClick(): void {
    this.openEditDialog();
  }

  onEditAuthorClick(author: Author): void {
    this.openEditDialog(author);
  }

  onDeleteAuthorClick(author: Author): void {
    this.authorService.deleteAuthor(author)
      .subscribe(() => {
        this.reload();
      }, () => {
        this.loader.hide();
      });
  }

  openEditDialog(author?: Author): void {
    const dialogConf = new MatDialogConfig();
    dialogConf.autoFocus = false;
    dialogConf.hasBackdrop = true;
    dialogConf.disableClose = true;
    dialogConf.width = '1000px';
    dialogConf.data = {
      author: author ? author : null,
    };

    const dialogRef = this.dialog.open(AuthorEditComponent, dialogConf);
    dialogRef.afterClosed().subscribe(data => {
      if (data && data.needReload) this.reload();
    });
  }

  reload(): void {
    this.loader.show();
    this.dataSource.data = [];

    this.authorService.getAuthorList()
      .subscribe((data) => {
        this.dataSource.data = data;
        this.loader.hide();
      }, () => {
        this.loader.hide();
      });
  }

}
