import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ToDoState, todoStateKey } from "./todos.reducers";
import { currentUserSelector, usersListSelector } from "../../users/state/users.selectors";
import { UserModel } from "../../users/userModel";


const todoFeatureSelector=createFeatureSelector<ToDoState>(todoStateKey);

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

export const selectedUserSelector=createSelector(
  usersListSelector,
  currentUserSelector,
  (users:UserModel[],userId:number)=>{
    if(userId !== 0) {return users.find(user=>user.id == userId) || null} else {return null}
  }
)

export const todoErrorSelector=createSelector(
  todoFeatureSelector,
  (state)=>state.error
)
