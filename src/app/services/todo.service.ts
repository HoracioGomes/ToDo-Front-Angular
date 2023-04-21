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

  delete(id: any): Observable<Boolean> {
    const urlToDelete = `${this.baseUrl}delete/${id}`;
    return this.http.delete<Boolean>(urlToDelete);
  }

  message(message: String): void{
    this.snack.open(`${message}`, "ok", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
    });
  }
}
