import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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

  constructor(private service: TodoService, private router: Router) {}

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

  markDone(todo: Todo): void {
    todo.finalizado = true;
    this.service.update(todo).subscribe(() => {
      this.service.message("Task finalizada com sucesso!");
      this.list = this.list.filter((todoList) => todoList.id !== todo.id);
      this.closed++
    });
  }

  delete(id: any): void {
    this.service.delete(id).subscribe((response) => {
      if (response === true) {
        this.service.message("Task deletada com sucesso!");
        this.list = this.list.filter((todo) => todo.id !== id);
      }
    });
  }

  goToEnded() {
    this.router.navigate(["finalizados"]);
  }
}
