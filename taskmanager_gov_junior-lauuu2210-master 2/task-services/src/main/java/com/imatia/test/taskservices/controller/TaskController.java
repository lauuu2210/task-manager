package com.imatia.test.taskservices.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.imatia.test.taskservices.exceptions.TaskNotFoundException;
import com.imatia.test.taskservices.model.Task;
import com.imatia.test.taskservices.repository.TaskRepository;

@RestController
@RequestMapping(TaskController.REQUEST_MAPPING)
@CrossOrigin(origins = "*")
public class TaskController {
	public static final String REQUEST_MAPPING = "api";

	/**
	 * 
	 * Array de string con todos los posibles tipos, prioridades y estados de una
	 * tarea.
	 * 
	 */
	private static final String[] TYPES = { "Task", "Epic", "Incidence", "Research" };
	private static final String[] PRIORITY = { "Low", "Medium", "High", "Let him cook" };
	private static final String[] STATUS = { "To Do", "In Progress", "Done" };

	@Autowired
	private TaskRepository repository;

	/**
	 * Listar todas las tareas contenidas en la base de datos.
	 * 
	 * @return List<Task> contenidas en memoria.
	 */
	@GetMapping(value = "/tasks")
	public List<Task> allTasks() {
		return (List<Task>) repository.findAll();
	}

	/**
	 * Listar todos los tipos de tarea que podemos encontrarnos en memoria.
	 * 
	 * @return String[] con el nombre de todos los tipos.
	 */
	@GetMapping(value = "/types")
	public String[] allTypes() {
		return TYPES;
	}

	/**
	 * Listar todos los estados en los que se puede encontrar una tarea.
	 * 
	 * @return String[] con el nombre de todos los estados.
	 */
	@GetMapping(value = "/status")
	public String[] allStates() {
		return STATUS;
	}

	/**
	 * Listar todas las prioridades que puede tener una tarea.
	 * 
	 * @return String[] con el nombre de todas las prioridades.
	 */
	@GetMapping(value = "/priority")
	public String[] allPrios() {
		return PRIORITY;
	}

	/**
	 * Obtener la información de una tarea en concreto, buscandola por su id.
	 * 
	 * @param id Identificador de la tarea en concreto.
	 * @return El objeto tarea correspondiente con el id dado.
	 * @throws TaskNotFoundException No existe una tarea con el id introducido.
	 */
	@GetMapping(value = "/task/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable UUID id) throws TaskNotFoundException {
		Task task = repository.findById(id)
				.orElseThrow(() -> new TaskNotFoundException("No existe la tarea con id: " + id));
		return ResponseEntity.ok(task);
	}

	/**
	 * Guarda, en la base de datos, una nueva tarea introducida.
	 * 
	 * @param task La tarea a guardar en memoria.
	 * @return La tarea que se acaba de guardar en memoria.
	 */
	@PostMapping(value = "/task")
	public Task saveTask(@RequestBody Task task) {
		return repository.save(task);
	}

	/**
	 * Actualiza una tarea en memoria.
	 * 
	 * @param id          El id de la tarea a actualizar.
	 * @param taskDetails La información de la tarea actualizada.
	 * @return La tarea que se acaba de actualizar en memoria.
	 * @throws TaskNotFoundException No existe una tarea con el id introducido.
	 */
	@PutMapping(value = "/task/{id}")
	public ResponseEntity<Task> updateTask(@PathVariable UUID id, @RequestBody Task taskDetails)
			throws TaskNotFoundException {
		System.out.println("Entra");

		Task task = repository.findById(id)
				.orElseThrow(() -> new TaskNotFoundException("No existe la tarea con id: " + id));

		task.setName(taskDetails.getName());
		task.setDate(taskDetails.getDate());
		task.setStatus(taskDetails.getStatus());
		task.setType(taskDetails.getType());
		task.setPriority(taskDetails.getPriority());
		task.setDescription(taskDetails.getDescription());

		Task taskUpdate = repository.save(task);
		return ResponseEntity.ok(taskUpdate);
	}
	
	/**
	 * Actualiza el estado de la tarea en memoria.
	 * 
	 * @param id El id de la tarea a actualizar.
	 * @param taskDetails La información del estado de la tarea actualizada.
	 * @return La tarea que se acaba de actualizar en memoria.
	 * @throws TaskNotFoundException No existe una tarea con el id introducido.
	 */
	@PutMapping(value = "/taskStatus/{id}")
	public ResponseEntity<Task> updateTaskStatus(@PathVariable UUID id, @RequestBody String taskDetails)
			throws TaskNotFoundException {

		Task task = repository.findById(id)
				.orElseThrow(() -> new TaskNotFoundException("No existe la tarea con id: " + id));

		task.setStatus(taskDetails);

		Task taskUpdate = repository.save(task);
		return ResponseEntity.ok(taskUpdate);
	}

	/**
	 * Elimina de memoria la tarea asociada al id.
	 * 
	 * @param id Id de la tarea a eliminar.
	 * @return La tarea eliminada de memoria.
	 * @throws TaskNotFoundException No existe una tarea con el id introducido.
	 */
	@DeleteMapping(value = "task/{id}")
	public ResponseEntity<Task> deleteTask(@PathVariable UUID id) throws TaskNotFoundException {
		Task task = repository.findById(id)
				.orElseThrow(() -> new TaskNotFoundException("No existe la tarea con id: " + id));
		repository.delete(task);
		return ResponseEntity.ok(task);
	}

}
