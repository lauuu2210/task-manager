import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../services/task';
import { TasksService } from '../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-trello',
  templateUrl: 'trello.component.html',
  styleUrls: ['trello.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TrelloComponent implements OnInit {

  lengthTodoPage: number;
  lengthProgressPage: number;
  lengthDonePage: number;
  pageSize = 5;

  pageTodoIndex = 0;
  pageProgressIndex = 0;
  pageDoneIndex = 0;

  pageSizeOptions = [5];

  hidePageSize = true;
  showPageSizeOptions = false;
  showFirstLastButtons = true;

  pageEvent: PageEvent;

  tasks: Task[];

  todo: Task[] = [];
  todoPage: Task[] = [];

  inProgress: Task[] = [];
  progressPage: Task[] = [];

  done: Task[] = [];
  donePage: Task[] = [];

  task: Task;


  constructor(private taskService: TasksService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.getTask();
  }

  /**
   * 
   * Se obtienen las tareas almacenadas en el backend, clasificandolas por su estado y ordenándolas por fecha de finalización.
   * 
   */

  private getTask() {
    this.taskService.getTaskList().subscribe((task: any) => {
      this.tasks = task;

      this.todo = this.tasks.filter(task => task.status == "To Do").sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      this.lengthTodoPage = this.todo.length;
      this.todoPage = this.todo.slice(this.pageTodoIndex, this.pageSize);

      this.inProgress = this.tasks.filter(task => task.status == "In Progress").sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      this.lengthProgressPage = this.inProgress.length;
      this.progressPage = this.inProgress.slice(this.pageProgressIndex, this.pageSize);

      this.done = this.tasks.filter(task => task.status == "Done").sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      this.lengthDonePage = this.done.length;
      this.donePage = this.done.slice(this.pageDoneIndex, this.pageSize);
    });
  }

  /**
   * 
   * Actualizacion visual de los elementos dentro de las listas, para evitar problemas con la vista de paginación.
   * 
   */

  showTask() {

    this.lengthTodoPage = this.todo.length;
    this.todoPage = this.todo.slice((this.pageTodoIndex * this.pageSize), (this.pageTodoIndex * this.pageSize) + this.pageSize).sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });;


    this.lengthProgressPage = this.inProgress.length;
    this.progressPage = this.inProgress.slice((this.pageProgressIndex * this.pageSize), (this.pageProgressIndex * this.pageSize) + this.pageSize).sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });;

    this.lengthDonePage = this.done.length;
    this.donePage = this.done.slice((this.pageDoneIndex * this.pageSize), (this.pageDoneIndex * this.pageSize) + this.pageSize).sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  /**
   * Se actualiza el estado en el backend de la tarjeta de trello que se ha trasladado. En caso de que esta actualización no sea exitosa,
   * se muestra un mensaje de error y se devuelve la tarjeta a su lugar correspondiente.
   * 
   * @param newStatus Nuevo estado de la tarjeta
   * @param id Identificador de la tarea que se desea desplazar
   * @param event Evento drag and drop asociado al movimiento
   */

  private refreshState(newStatus: string, id: string, event: CdkDragDrop<Task[]>) {
    this.taskService.modifyTaskStatus(id, newStatus).subscribe(
      () => {
        this.showTask();
      },
      (error) => {
        this.toastrService.error("Error al cambiar el estado de la tarea");
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex,
        );
      }
    );

  }

  /**
   * Acción asociada a el evento correspondiente a el movimiento drag and drop de las cartas de trello. 
   * Se realiza tanto la actualización visual como una llamada para realizar la actualizacion en el backend.
   * 
   * @param event Evento generado por el movimiento de una tarjeta de una columna de trello a otra
   * @param statusNew Nuevo estado que debe adoptar la tarea que se ha movido en el evento
   */

  drop(event: CdkDragDrop<Task[]>, statusNew: string) {

    if (event.previousContainer !== event.container) {

      switch (event.previousContainer.id) {
        // Corresponde a la primero columna de trello "To do"
        case "cdk-drop-list-0":
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex + (this.pageSize * this.pageTodoIndex),
            event.currentIndex,
          );
          break;

        // Corresponde con la segunda columna de trello "In progress"
        case "cdk-drop-list-1":
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex + (this.pageSize * this.pageProgressIndex),
            event.currentIndex,
          );
          break;

        // Corresponde con la tercera columna de trello "Done"
        case "cdk-drop-list-2":
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex + (this.pageSize * this.pageProgressIndex),
            event.currentIndex,
          );
          break;
      }
      const task = event.container.data[event.currentIndex];
      this.refreshState(statusNew, task.id, event);
    }
  }

  /**
   * Cambia la página y muestra la información correspondiente a cada página. 
   * Los elementos de cambio de página son independientes, por lo que es necesario 
   * controlar de manera independiente las listas, los elementos y los índices de cada uno de ellos.
   * 
   * 
   * @param e Evento paginación generado
   * @param columnName Nombre de la columna en la que se genera el evento de paginación
   */
  handlePageEvent(e: PageEvent, columnName: string) {
    console.log(this.pageTodoIndex);

    this.pageEvent = e;
    const startIndex = e.pageIndex * e.pageSize;
    const endIndex = startIndex + e.pageSize;

    switch (columnName) {
      case "To Do":
        this.lengthTodoPage = e.length;
        this.pageTodoIndex = e.pageIndex;
        this.todoPage = this.todo.slice(startIndex, endIndex).sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });;
        break;

      case "In Progress":
        this.lengthProgressPage = e.length;
        this.pageProgressIndex = e.pageIndex;
        this.progressPage = this.inProgress.slice(startIndex, endIndex).sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });;
        break;

      case "Done":
        this.lengthDonePage = e.length;
        this.pageDoneIndex = e.pageIndex;
        this.donePage = this.done.slice(startIndex, endIndex).sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });;
        break;
    }
  }

}
