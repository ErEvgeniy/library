import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Comment } from "../../shared/model";
import { BASE_PATH } from "../../shared/constant";

@Injectable()
export class CommentService {

  private static readonly SERVICE_PATH = BASE_PATH.LIBRARY_URL + '/comment';

  constructor(
    private http: HttpClient,
  ) { }

  getCommentsByBook(bookId: string): Observable<Array<Comment>> {
    return <Observable<Array<Comment>>>
      this.http.get(`${CommentService.SERVICE_PATH}/book/${bookId}`);
  }

  createComment(comment: Comment, bookId: string): Observable<any> {
    return <Observable<any>>
      this.http.post(`${CommentService.SERVICE_PATH}`, comment, {
        params: {
          bookId: bookId
        }
      });
  }

  updateComment(comment: Comment): Observable<any> {
    return <Observable<any>>
      this.http.patch(`${CommentService.SERVICE_PATH}`, comment);
  }

  deleteComment(comment: Comment): Observable<any> {
    return <Observable<any>>
      this.http.delete(`${CommentService.SERVICE_PATH}/${comment.id}`);
  }

}
