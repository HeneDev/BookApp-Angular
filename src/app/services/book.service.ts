import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class BookService   {
  private readonly URL_CREATE_BOOK: string = 'https://buuttiapp-backend.herokuapp.com/api/books/add';
  private readonly URL_FETCH_BOOKS: string = 'https://buuttiapp-backend.herokuapp.com/api/books';
  private readonly URL_UPDATE_BOOK: string = 'https://buuttiapp-backend.herokuapp.com/api/books/update/';
  private readonly URL_DELETE_BOOK: string = 'https://buuttiapp-backend.herokuapp.com/api/books/delete/';

  constructor(private http: HttpClient, private router: Router) { }

  public async fetchBooks() {
    return this.http.get(this.URL_FETCH_BOOKS, {});
  }

  public async saveBook(book: any) {
    return this.http.post(this.URL_CREATE_BOOK, book);
  }

  public async updateBook(book: any) {
    return this.http.put(this.URL_UPDATE_BOOK + book.id, book);
  }

  public async deleteBook(bookId: any) {
    return this.http.delete(this.URL_DELETE_BOOK + bookId);
  }
}
