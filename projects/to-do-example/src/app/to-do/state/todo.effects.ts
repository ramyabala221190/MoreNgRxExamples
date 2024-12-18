import { Injectable } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';
import {Actions,createEffect, ofType} from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ToDoApiActions, ToDoTabActions } from './todos.actions';
import { ToDoModel } from '../todoModel';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoEffects {

  constructor(private actions$:Actions,private todoService:ToDoService) { }

  ngrxOnInitEffects(){
    return ToDoApiActions.loadToDos();
  }

  loadToDos$=createEffect(()=>{
    return this.actions$.pipe( //listens to all action types
      ofType(ToDoApiActions.loadToDos), //filtering based on the action type dispatched by the component
      mergeMap(()=>{
        //execute the api call
         return this.todoService.fetchToDos().pipe(
          map((result:ToDoModel[])=>ToDoApiActions.loadingToDosSuccess({todoList:result})),
          catchError((err:HttpErrorResponse)=>of(ToDoApiActions.loadingToDosFailed({message:err.statusText})))
         )
      })
    )
  })

  updateToDos$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(ToDoTabActions.updateToDo),
      mergeMap((state)=>{
        return this.todoService.updateToDo(state.updatedToDo,state.todoIndex).pipe(
          map(()=>ToDoApiActions.updatingToDosSuccess({updatedToDo:state.updatedToDo})),
          catchError((err:HttpErrorResponse)=>of(ToDoApiActions.updatingToDosFailed({message:err.statusText})))
        )

      })
    )
  })

  deleteToDos$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(ToDoTabActions.deleteToDo),
      mergeMap((state)=>{
        return this.todoService.deleteToDo(state.todoIndex).pipe(
          map(()=>ToDoApiActions.deletingToDosSuccess({todoIndex:state.todoIndex})),
          catchError((err:HttpErrorResponse)=>of(ToDoApiActions.deletingToDosFailed({message:err.statusText})))
        )
      })
    )
  })

  
}
