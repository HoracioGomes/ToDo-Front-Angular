import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Todo } from "src/app/models/todo";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-read-all",
  templateUrl: "./read-all.component.html",
  styleUrls: ["./read-all.component.css"],
})
export class ReadAllComponent implements OnInit {
  list: Todo[] = [];
  finishedList: Todo[] = [];
  closed = 0;

  ngOnInit(): void {
    this.findAll();
  }

  constructor(private service: TodoService) {}

  findAll(): void {
    this.service.findAll().subscribe((response) => {
      response.forEach((todo) => {
        if (!todo.finalizado) {
          this.list.push(todo);
        } else {
          this.finishedList.push(todo);
        }
      });
      this.closed = this.finishedList.length;
    });
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((response) => {
      if (response === true) {
        this.service.message("Task deletada com sucesso!");
        this.list = this.list.filter(todo => todo.id !== id)
      }
    });
  }
}
