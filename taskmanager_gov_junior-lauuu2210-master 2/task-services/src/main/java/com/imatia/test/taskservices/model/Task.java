package com.imatia.test.taskservices.model;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * 
 * Clase que define los parametros guardados en memoria de las tareas
 *
 */
@Entity
@Table(name = "tasks")
public class Task implements Serializable {

	private static final long serialVersionUID = 3224578592868604637L;

	/**
	 * 
	 * Identificador único relacionado con cada tarea
	 * 
	 */
	@Id
	@GeneratedValue
	@Column(columnDefinition = "uuid NOT NULL DEFAULT random_uuid()")
	private UUID id;

	/**
	 * 
	 * Fecha de creación de la tarea
	 * 
	 */
	@Column(columnDefinition = "timestamp NOT NULL default current_timestamp()")
	private Timestamp date;

	/**
	 * 
	 * Nombre de la tarea
	 * 
	 */
	@Column(columnDefinition = "varchar(50) NOT NULL")
	private String name;

	/**
	 * 
	 * Description de la tarea
	 * 
	 */
	@Column(columnDefinition = "varchar(500) NOT NULL")
	private String description;

	/**
	 * 
	 * Tipo de tarea ("Task", "Epic", "Incidence", "Research")
	 * 
	 */
	@Column(columnDefinition = "varchar(50) NOT NULL")
	private String type;

	/**
	 * 
	 * Estado de la tarea ("To Do", "In Progress", "Done")
	 * 
	 */
	@Column(columnDefinition = "varchar(50) NOT NULL")
	private String status;

	/**
	 * 
	 * Prioridad adociada a esa tarea ("Low", "Medium", "High", "Let him cook")
	 * 
	 */
	@Column(columnDefinition = "varchar(50) NOT NULL")
	private String priority;
	
	/**
	 * Constructor tarea vacía
	 */
	public Task() {
		
	}

	/**
	 * Contructor de una nueva tarea
	 * 
	 * @param idTask      Identificador de la tarea, se genera automaticamente si no
	 *                    se incluye
	 * @param date        Fecha de creación de la tarea
	 * @param name        Nombre asociado a la tarea
	 * @param description Descripción de la tarea
	 * @param type        Tipo de tarea
	 * @param status      Estado de la tarea
	 * @param priority    Prioridad de la tarea
	 */
	public Task(UUID idTask, Timestamp date, String name, String description, String type, String status,
			String priority) {
		super();
		this.id = idTask;
		this.name = name;
		this.type = type;
		this.status = status;
		this.priority = priority;
		this.date = date;
		this.description = description;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

}
