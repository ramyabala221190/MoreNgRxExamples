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
           todos:effectResult.todoList, // update the ToDo items in the table
           error:"" //any existing error messages will be removed
        }
        
    }),
    on(ToDoApiActions.loadingToDosFailed,(state,effectResult)=>{
        return {
            ...state,
            todos:[], // loading failed. No ToDo items will be displayed in the table
            error:effectResult.message //display the error message
        } 
    }),
    on(ToDoApiActions.updatingToDosFailed, ToDoApiActions.deletingToDosFailed,(state,effectResult)=>{
        return {
            ...state, //update has failed. so the table remains unchanged
            error:effectResult.message //display only the error message
        }
    }),
    on(ToDoApiActions.updatingToDosSuccess,(state,effectsResult)=>{
        return {
            ...state,
            todos: state.todos.map(todo=> todo.id == effectsResult.updatedToDo.id ? effectsResult.updatedToDo: todo), 
            // update the old item with the updated one
            error:"" //remove any error messages
        }
    }),
    on(ToDoApiActions.deletingToDosSuccess,(state,effectsResult)=>{
        return {
            ...state,
            todos: state.todos.filter(todo=>todo.id !== effectsResult.todoIndex), //remove the todo item from the table
            error:"" //remove any error messages
        }
    })

)