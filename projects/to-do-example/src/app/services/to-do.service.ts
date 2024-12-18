import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDoModel } from '../to-do/todoModel';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http:HttpClient) { }

  todoUrl:string="api/todos";

  fetchToDos(){
    return this.http.get<ToDoModel[]>(this.todoUrl);
  }

  updateToDo(updatedToDo:ToDoModel,todoIndex:number){
    return this.http.put(`${this.todoUrl}/${todoIndex}`,updatedToDo)
  }

  deleteToDo(todoIndex:number){
    return this.http.delete(`${this.todoUrl}/${todoIndex}`);
  }

}
