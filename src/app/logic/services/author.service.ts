import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Author } from "../../shared/model";
import { Observable } from "rxjs";
import { BASE_PATH } from "../../shared/constant";

@Injectable()
export class AuthorService {

  private static readonly SERVICE_PATH = BASE_PATH.LIBRARY_URL + '/author';

  constructor(
    private http: HttpClient,
  ) { }

  getAuthorList(): Observable<Array<Author>> {
    return <Observable<Array<Author>>>
      this.http.get(`${AuthorService.SERVICE_PATH}`);
  }

  createAuthor(author: Author): Observable<any> {
    return <Observable<any>>
      this.http.post(`${AuthorService.SERVICE_PATH}`, author);
  }

  updateAuthor(author: Author): Observable<any> {
    return <Observable<any>>
      this.http.patch(`${AuthorService.SERVICE_PATH}/${author.id}`, author);
  }

  deleteAuthor(author: Author): Observable<any> {
    return <Observable<any>>
      this.http.delete(`${AuthorService.SERVICE_PATH}/${author.id}`);
  }

}
