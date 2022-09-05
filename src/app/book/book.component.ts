import {Component, OnInit} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Book } from "../services/book.model";
import { BookService } from "../services/book.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit  {

  public bookForm: any;
  public books: Book[];
  public ready: boolean = false;
   constructor(
       private formBuilder:FormBuilder,
       private bookService:BookService
   ) {}

   ngOnInit() {
       this.initForm();
       this.fetchBook();
   }

   public initForm(book?:any){
       this.bookForm = this.formBuilder.group({
           id:[book? book._id:''],
           title:[book? book.title:''],
           author:[book? book.author:''],
           description:[book? book.description:''],
         });
   }

   saveNew() {
       const book: Book = this.bookForm.value;

       const response: any =  this.bookService.saveBook(book);
       response.then((data: any) => {
          data.subscribe((bookData: any) => {
            this.books.push(bookData)
            });
        });
       this.setForm("", null)
     }

     update(){
       const book: Book = this.bookForm.value;
       const response: any =  this.bookService.updateBook(book);

       response.then((data: any) => {
         data.subscribe((bookData: any) => {
            this.books = this.books.filter((b: any) => {
              return b._id !== bookData._id
            })
            this.books.push(bookData)
          });
      });
     }

     delete() {
       const book: Book = this.bookForm.value;
       const response: any =  this.bookService.deleteBook(book.id);
       response.then((data: any) => {
         data.subscribe((bookData: any) => {
          this.books = this.books.filter((b: any) => b._id !== bookData._id)
          });
      });
      this.setForm("", null)
     }

      async fetchBook() {
       const response: any = (await this.bookService.fetchBooks()).subscribe((data: any) => { 
        this.books = data;
      });
      this.ready = true;
     }

     setForm(book:any, elem:HTMLElement | null) {
      let oldElem = document.querySelectorAll(".list-group-item.selected");

      oldElem.forEach(function(el:any) {
        el.classList.remove("selected");
      });

      elem?.classList.add('selected');
      this.initForm(book);
     }
}
