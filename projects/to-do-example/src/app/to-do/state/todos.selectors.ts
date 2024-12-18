import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ToDoState, todoStateKey } from "./todos.reducers";
import { currentUserSelector } from "../../users/state/users.selectors";


const todoFeatureSelector=createFeatureSelector<ToDoState>(todoStateKey); // extract the "todoState" slice from the store

//this selector will decide the contents of the table
export const todoListSelector=createSelector(
    todoFeatureSelector,
    currentUserSelector,
    (todoState,currentUser)=>{
        if(currentUser !== 0){
          return  todoState.todos.filter(todo=>todo.userId === currentUser)
        }
            return todoState.todos;
    
    }
) 

//this selector will extract the error message
export const todoErrorSelector=createSelector(
  todoFeatureSelector,
  (state)=>state.error
)

