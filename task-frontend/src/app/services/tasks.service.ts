import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  //Acceso a la API
  private baseUrl = "http://localhost:8080/api"

  constructor(private httpClient: HttpClient) { }

  /**
   * Obtiene una lista de todas las tareas en memoria.
   * 
   * @returns Array con todas las tareas en memoria.
   */
  getTaskList() {
    return this.httpClient.get(`${this.baseUrl}/tasks`);
  }

  /**
   * Obtener los tipos de tareas guardados en memoria.
   * 
   * @returns Array de string con los tipos de tareas.
   */
  getTypesList() {
    return this.httpClient.get(`${this.baseUrl}/types`);
  }

  /**
   * Obtener los estados de tareas guardados en memoria.
   * 
   * @returns Array de string con los estados de tareas.
   */
  getStatusList() {
    return this.httpClient.get(`${this.baseUrl}/status`);
  }

  /**
   * Obtener los prioridades de tareas guardados en memoria.
   * 
   * @returns Array de string con los prioridades de tareas.
   */
  getPriorityList() {
    return this.httpClient.get(`${this.baseUrl}/priority`);
  }

  /**
   * Añade una tarea a la memoria.
   * 
   * @param body El contenido de la tarea a añadir.
   * @returns La tarea añadida a memoria.
   */
  addTask(body: any) {
    return this.httpClient.post(`${this.baseUrl}/task`, body);
  }

  /**
   * Modifica una tarea de la memoria.
   * 
   * @param id El identificador de la tarea a modificar.
   * @param body Datos a modificar de la tarea.
   * @returns La tarea modificada en memoria.
   */
  modifyTask(id: string, body: any) {
    return this.httpClient.put(`${this.baseUrl}/task/${id}`, body);;
  }

  /**
   * Modifica el estado de una tarea en memoria.
   * 
   * @param id El identificador de la tarea a modificar.
   * @param body El nuevo estado de la tarea.
   * @returns La tarea modificada en memoria.
   */
  modifyTaskStatus(id: string, body: any) {
    return this.httpClient.put(`${this.baseUrl}/taskStatus/${id}`, body);
  }

  /**
   * Obtener una tarea por su identificador.
   * 
   * @param id El identificador de la tarea a obtener de memoria.
   * @returns La tarea que se ha obtenido en la llamada.
   */
  getTaskById(id: any) {
    return this.httpClient.get(`${this.baseUrl}/task/${id}`);
  }

  /**
   * Elimina una tarea de memoria por su identificador.
   * 
   * @param id El identificador de la tarea a eliminar.
   * @returns La tarea que se acaba de eliminar de memoria.
   */
  deleteTask(id: any) {
    return this.httpClient.delete(`${this.baseUrl}/task/${id}`);
  }




}
