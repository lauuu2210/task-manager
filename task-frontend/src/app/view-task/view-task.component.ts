import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'view-task-form',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  taskForm: FormGroup;
  task: any;
  types: string[];
  status: string[];
  priority: string[];
  id: string;


  /**
  * Obtención de las listas de los posibles valores de las variables de tipos, estados y prioridades.
  * Obtención e inclusión en el formulario de los valores relacionados con la tarea seleccionada.
  * 
  * @param formBuilder Servicio para el control de los formularios
  * @param taskService Servicio para acceder a los datos del backend
  * @param toastrService Servicio para generar los mensajes para mostrar al usuario 
  * @param router Servicio usado para el redireccionamiento de rutas
  */
  constructor(private formBuilder: FormBuilder, private taskService: TasksService, private toastrService: ToastrService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.task = taskService.getTaskById(this.id).subscribe((tasks: any) => {
        this.completeForm(tasks);
      });
    });

    this.taskService.getTypesList().subscribe(
      (data: any) => {
        this.types = data;

      })

    this.taskService.getStatusList().subscribe(
      (data: any) => {
        this.status = data;

      })

    this.taskService.getPriorityList().subscribe(
      (data: any) => {
        this.priority = data;

      })
  }

  ngOnInit() {
    this.initForm();
    console.log(this.task);
  }

  /**
   * Introducción de los datos correspondientes a la tarea seleccionada en el formulario.
   * 
   * @param task Tarea que se quiere visualizar
   */
  completeForm(task: any) {

    this.taskForm.setValue({
      name: task.name,
      date: task.date,
      type: task.type,
      status: task.status,
      priority: task.priority,
      desc: task.description,
    });

    this.taskForm.disable();
  }

  /**
  * Inicialización del formulario vacío.
  */
  initForm() {

    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: [new Date(), Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      desc: ['', Validators.required]
    });
  }

  /**
   * 
   * Primer click en el botón: Activación de los campos para poder realizar modificaciones en la tarea que se está viendo.
   * 
   * Segundo click: Modificación de la tarea con los valores actuales de los campos del formulario. 
   * Se muestra un mensaje por pantalla y se devuelve a la pagina principal si se realiza correctamente la modificación.
   * De lo contrario, se muestra un mensaje informando del error.
   * 
   */
  submit() {

    if (this.taskForm.valid || this.taskForm.enabled) {
      const body = {
        name: this.taskForm.value.name,
        type: this.taskForm.value.type,
        status: this.taskForm.value.status,
        priority: this.taskForm.value.priority,
        date: new Date(this.taskForm.value.date),
        description: this.taskForm.value.desc,
      };
      this.taskService.modifyTask(this.id, body).subscribe(
        () => {

          this.router.navigate(['/trello']);;
          this.toastrService.success("Se ha modificado la tarea correctamente");
        },
        (error) => {
          this.toastrService.error("Error al modificar la tarea");
        }
      );
    } else {
      this.taskForm.enable();
    }
  }


  /**
   * 
   * Eliminación de la tarea que estamos viendo. En caso de realizarse correctamente se muestra un mensaje por pantalla y se devuelve a la página principal.
   * De lo contrario, se muestra un mensaje informando del error.
   * 
   */
  delete() {
    this.taskService.deleteTask(this.id).subscribe(
      () => {

        this.router.navigate(['/trello']);;
        this.toastrService.success("Se ha eliminado la tarea correctamente");
      },
      (error) => {
        this.toastrService.error("Error al eliminar la tarea");
      }
    )
  }
}
