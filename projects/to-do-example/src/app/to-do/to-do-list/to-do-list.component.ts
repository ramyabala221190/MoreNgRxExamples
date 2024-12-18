import { Component } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import {ToDoTabActions } from '../state/todos.actions';
import { ToDoState } from '../state/todos.reducers';
import { todoErrorSelector, todoListSelector } from '../state/todos.selectors';
import { ToDoModel } from '../todoModel';
import { UserModel } from '../../users/userModel';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent {

  get todoListItems(){
    return (<FormArray>this.todoFormGroup?.get('todoList'))
  }
  
  error$?:Observable<string>;
  todoFormGroup?:FormGroup;
  completedOptions=[true,false];

  constructor(private store:Store<ToDoState>,private fb:FormBuilder) {}

  ngOnInit(){
    this.error$=this.store.select(todoErrorSelector)
    this.todoFormGroup=this.fb.group({
      todoList: this.fb.array([])
     })
    
    //subscribing to the state slice to get the updated the todo list
    this.store.select(todoListSelector).pipe(
      tap((todos:ToDoModel[])=>{
        this.todoFormGroup?.setControl("todoList",this.fb.array(this.returnToDoGroup(todos)))
      })
    ).subscribe();
   // this.store.dispatch(ToDoTabActions.loadToDos())  //dispatch an action to get the todo list
  }

  updateToDo(todoIndex:number){
    const updatedToDoItem:ToDoModel=(<FormArray>this.todoFormGroup?.get('todoList')).at(todoIndex).value;
    this.store.dispatch(ToDoTabActions.updateToDo({updatedToDo:updatedToDoItem,todoIndex:updatedToDoItem.id}))
  }

  deleteToDo(todoIndex:number){
    const todoItemToBeDeleted:ToDoModel=(<FormArray>this.todoFormGroup?.get('todoList')).at(todoIndex).value;
     this.store.dispatch(ToDoTabActions.deleteToDo({todoIndex:todoItemToBeDeleted.id}));
  }

  returnToDoGroup(todos:ToDoModel[]){
     return todos.map((todo:ToDoModel)=>{
      return new FormGroup({
        id:new FormControl(todo.id),
        userId:new FormControl(todo.userId),
        title:new FormControl(todo.title),
        completed:new FormControl(todo.completed)
      })
     })
  }
}
