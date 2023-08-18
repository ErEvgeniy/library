import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LoaderService } from "../../../logic/services/loader.service";
import { Genre } from "../../../shared/model";
import { MatTableDataSource } from "@angular/material/table";
import { GenreEditComponent } from "../genre-edit/genre-edit.component";
import { GenreService } from "../../../logic/services/genre.service";

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {

  dataSource: MatTableDataSource<Genre> = new MatTableDataSource([]);
  displayedColumns: Array<string> = ['id', 'name', 'actions'];

  constructor(
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

  onCreateGenreClick(): void {
    this.openEditDialog();
  }

  onEditGenreClick(genre: Genre): void {
    this.openEditDialog(genre);
  }

  onDeleteGenreClick(genre: Genre): void {
    this.genreService.deleteGenre(genre)
      .subscribe(() => {
        this.reload();
      }, () => {
        this.loader.hide();
      });
  }

  openEditDialog(genre?: Genre): void {
    const dialogConf = new MatDialogConfig();
    dialogConf.autoFocus = false;
    dialogConf.hasBackdrop = true;
    dialogConf.disableClose = true;
    dialogConf.width = '1000px';
    dialogConf.data = {
      genre: genre ? genre : null,
    };

    const dialogRef = this.dialog.open(GenreEditComponent, dialogConf);
    dialogRef.afterClosed().subscribe(data => {
      if (data && data.needReload) this.reload();
    });
  }

  reload(): void {
    this.loader.show();
    this.dataSource.data = [];

    this.genreService.getGenreList()
      .subscribe((data) => {
        this.dataSource.data = data;
        this.loader.hide();
      }, () => {
        this.loader.hide();
      });
  }

}
