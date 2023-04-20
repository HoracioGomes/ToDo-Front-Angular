import { Component, OnInit } from "@angular/core";
import { Todo } from "src/app/models/todo";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-read-all",
  templateUrl: "./read-all.component.html",
  styleUrls: ["./read-all.component.css"],
})
export class ReadAllComponent implements OnInit {
  list: Todo[] = [];
  closed = 0;

  ngOnInit(): void {
    this.findAll();
  }

  constructor(private service: TodoService) {}

  findAll(): void {
    this.service.findAll().subscribe((response) => {
      this.list = response;
      this.countClosed();
    });
  }

  countClosed() {
    this.list.forEach((todo) => {
      if (todo.finalizado) {
        this.closed++;
      }
    });
  }
}
