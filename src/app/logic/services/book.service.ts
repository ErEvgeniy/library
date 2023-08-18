import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Book } from "../../shared/model";
import { BASE_PATH } from "../../shared/constant";

@Injectable()
export class BookService {

  private static readonly SERVICE_PATH = BASE_PATH.LIBRARY_URL + '/book';

  constructor(
    private http: HttpClient,
  ) { }

  getBookList(): Observable<Array<Book>> {
    return <Observable<Array<Book>>>
      this.http.get(`${BookService.SERVICE_PATH}`);
  }

  createBook(book: Book): Observable<any> {
    return <Observable<any>>
      this.http.post(`${BookService.SERVICE_PATH}`, book);
  }

  updateBook(book: Book): Observable<any> {
    return <Observable<any>>
      this.http.patch(`${BookService.SERVICE_PATH}`, book);
  }

  deleteBook(book: Book): Observable<any> {
    return <Observable<any>>
      this.http.delete(`${BookService.SERVICE_PATH}/${book.id}`);
  }

}
