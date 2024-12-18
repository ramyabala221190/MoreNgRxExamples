import { createReducer, on } from "@ngrx/store";
import { ToDoApiActions } from "./todos.actions";
import { ToDoModel } from "../todoModel";

export interface ToDoState{
    todos:ToDoModel[],
    error:string
}

export const todoStateKey= "todoState";

let initialToDosListState:ToDoState={
    todos:[],
    error:""
}

export const todosReducer=createReducer(
    initialToDosListState,
    on(ToDoApiActions.loadingToDosSuccess,(state,effectResult)=>{
        return {
            ...state,
           todos:effectResult.todoList,
           error:""
        }
        
    }),
    on(ToDoApiActions.loadingToDosFailed,(state,effectResult)=>{
        return {
            ...state,
            todos:[],
            error:effectResult.message
        }
    }),
    on(ToDoApiActions.updatingToDosFailed, ToDoApiActions.deletingToDosFailed,(state,effectResult)=>{
        return {
            ...state,
            error:effectResult.message
        }
    }),
    on(ToDoApiActions.updatingToDosSuccess,(state,effectsResult)=>{
        return {
            ...state,
            todos: state.todos.map(todo=> todo.id == effectsResult.updatedToDo.id ? effectsResult.updatedToDo: todo),
            error:""
        }
    }),
    on(ToDoApiActions.deletingToDosSuccess,(state,effectsResult)=>{
        return {
            ...state,
            todos: state.todos.filter(todo=>todo.id !== effectsResult.todoIndex),
            error:""
        }
    })

)