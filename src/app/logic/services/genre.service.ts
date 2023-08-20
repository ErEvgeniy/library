import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Genre } from "../../shared/model";
import { BASE_PATH } from "../../shared/constant";

@Injectable()
export class GenreService {

  private static readonly SERVICE_PATH = BASE_PATH.LIBRARY_URL + '/genre';

  constructor(
    private http: HttpClient,
  ) { }

  getGenreList(): Observable<Array<Genre>> {
    return <Observable<Array<Genre>>>
      this.http.get(`${GenreService.SERVICE_PATH}`);
  }

  createGenre(genre: Genre): Observable<any> {
    return <Observable<any>>
      this.http.post(`${GenreService.SERVICE_PATH}`, genre);
  }

  updateGenre(genre: Genre): Observable<any> {
    return <Observable<any>>
      this.http.patch(`${GenreService.SERVICE_PATH}/${genre.id}`, genre);
  }

  deleteGenre(genre: Genre): Observable<any> {
    return <Observable<any>>
      this.http.delete(`${GenreService.SERVICE_PATH}/${genre.id}`);
  }

}
