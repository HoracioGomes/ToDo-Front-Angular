import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Todo } from "src/app/models/todo";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"],
})
export class CreateComponent {
  constructor(private service: TodoService, private router: Router) {}

  newTodo: Todo = {
    titulo: "",
    descricao: "",
    dataParaFinalizar: new Date(),
    finalizado: false,
  };

  create(): void{
    this.formataData();
    this.service.save(this.newTodo).subscribe((response)=>{
    this.service.message(`${response.titulo}, salvo com sucesso!`);
    this.router.navigate(['']);

    }, err =>{
      this.service.message("Falhar ao criar!")
      this.router.navigate(['']);
    });
  }

  formataData(): void{
    let data = new Date(this.newTodo.dataParaFinalizar);
    this.newTodo.dataParaFinalizar = `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`     
  }

  goToAllTasks() {
    this.router.navigate([""]);
  }
}
