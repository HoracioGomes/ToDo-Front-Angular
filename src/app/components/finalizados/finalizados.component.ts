import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Todo } from "src/app/models/todo";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-finalizados",
  templateUrl: "./finalizados.component.html",
  styleUrls: ["./finalizados.component.css"],
})
export class FinalizadosComponent implements OnInit {
  ngOnInit(): void {this.findAll()}
  finishedList: Todo[] = [];

  constructor(private service: TodoService, private router: Router) {}

  findAll(): void {
    this.service.findAll().subscribe((response) => {
      response.forEach((todo) => {
        if (todo.finalizado) {
          this.finishedList.push(todo);
        }
      });
    });
  }

  back(): void{
    this.router.navigate(['']);
  }
}
