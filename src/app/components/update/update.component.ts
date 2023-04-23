import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Todo } from "src/app/models/todo";
import { TodoService } from "src/app/services/todo.service";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"],
})
export class UpdateComponent implements OnInit {
  constructor(
    private service: TodoService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.findById();
  }

  newTodo: Todo = {
    titulo: "",
    descricao: "",
    dataParaFinalizar: new Date(),
    finalizado: false,
  };

  findById(): void {
    this.service
      .findById(this.activeRoute.snapshot.paramMap.get("id"))
      .subscribe((response) => {
        this.newTodo.id = response.id;
        this.newTodo.dataParaFinalizar = response.dataParaFinalizar;
        this.newTodo.descricao = response.descricao;
        this.newTodo.titulo = response.titulo;
        this.newTodo.finalizado = response.finalizado;
      });
  }

  update(): void{
    this.service.update(this.newTodo).subscribe((response)=>{
      this.service.message(`${response.titulo} atualizado!`);
      this.goToAllTasks();
    }, error=>{
      this.service.message("Erro ao atualizar!");
      this.router.navigate([""]);
    })
  }

  formataData(): void {
    let data = new Date(this.newTodo.dataParaFinalizar);
    this.newTodo.dataParaFinalizar = `${data.getDate()}/${
      data.getMonth() + 1
    }/${data.getFullYear()}`;
  }

  goToAllTasks() {
    this.router.navigate([""]);
  }
}
