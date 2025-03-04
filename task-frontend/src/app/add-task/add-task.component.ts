import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'add-task-form',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  taskForm: FormGroup;
  types: string[];
  status: string[];
  priority: string[];
  nameRegx = /^.{1,50}$/;
  descRegx = /^.{1,500}$/;
  nameControl = new FormControl('', [Validators.required, Validators.pattern(this.nameRegx)]);
  descControl = new FormControl('', [Validators.required, Validators.pattern(this.descRegx)]);

  /**
   * Obtención de las listas de los posibles valores de las variables de tipos, estados y prioridades.
   * 
   * @param formBuilder Servicio para el control de los formularios
   * @param taskService Servicio para acceder a los datos del backend
   * @param toastrService Servicio para generar los mensajes para mostrar al usuario 
   * @param router Servicio usado para el redireccionamiento de rutas
   */
  constructor(
    private formBuilder: FormBuilder, private taskService: TasksService, private toastrService: ToastrService, private router: Router
  ) {

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
  }

  /**
   * 
   * Inicialización del formulario vacío.
   * 
   */
  initForm() {
    this.taskForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.nameRegx)]],
      date: [new Date(), Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      desc: ['', [Validators.required, Validators.pattern(this.descRegx)]]
    });
  }

  /**
   * 
   * Envío al backend de la información de la nueva tarea. Si no es posible añadirla, se mostrará un mensaje de error. 
   * 
   * Sino, se muestra un mensaje positivo y se redirije a la página principal
   * 
   */
  submit() {
    if (this.taskForm.valid) {
      const body = {
        name: this.taskForm.value.name,
        type: this.taskForm.value.type,
        status: this.taskForm.value.status,
        priority: this.taskForm.value.priority,
        date: this.taskForm.value.date.getTime(),
        description: this.taskForm.value.desc,
      };

      this.taskService.addTask(body).subscribe(
        () => {
          this.router.navigate(['/trello']);;
          this.toastrService.success("Se ha añadido la tarea correctamente");
        },
        (error) => {
          this.toastrService.error("Error al añadir la tarea");
        }
      );
    }
  }
}

