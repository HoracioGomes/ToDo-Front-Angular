import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "../models/todo";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  baseUrl = "http://localhost:8080/todo/";

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  update(todo: Todo): Observable<Todo> {
    const urlToUpdate = `${this.baseUrl}${todo.id}`;
    return this.http.put<Todo>(urlToUpdate, todo);
  }

  delete(id: any): Observable<Boolean> {
    const urlToDelete = `${this.baseUrl}delete/${id}`;
    return this.http.delete<Boolean>(urlToDelete);
  }

  save(todo: Todo): Observable<Todo> {
    const urlToSave = `${this.baseUrl}save`;
    return this.http.post<Todo>(urlToSave, todo);
  }

  findById(id: any) : Observable<Todo> {
    const urlToFind = `${this.baseUrl}${id}`;
    return this.http.get<Todo>(urlToFind);
  }

  message(message: String): void {
    this.snack.open(`${message}`, "ok", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
    });
  }
}
