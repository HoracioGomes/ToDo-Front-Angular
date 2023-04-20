import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Todo } from "../models/todo";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  baseUrl = "http://localhost:8080/todo/";

  constructor(private http: HttpClient) {}

  findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }
}
