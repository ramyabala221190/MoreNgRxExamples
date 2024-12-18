import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { ToDoModel } from "../todoModel";


export const ToDoTabActions=createActionGroup({
    source:"ToDo Tab",
    events:{
        "Update ToDo":props<{updatedToDo:ToDoModel,todoIndex:number}>(), // Clicking on Update button dispatches this action
        "Delete ToDo":props<{todoIndex:number}>(), //Clicking on Delete button dispatches this action
    }
})

export const ToDoApiActions=createActionGroup({
    //All the below actions are dispatched by Effects
    source:"ToDo API",
    events:{
        "Load ToDos":emptyProps(), 
       "Loading ToDos Success" : props<{todoList:ToDoModel[]}>(),
       "Loading ToDos Failed" : props<{message:string}>(),
       "Updating ToDos Success":props<{updatedToDo:ToDoModel}>(),
       "Updating ToDos Failed" : props<{message:string}>(),
       "Deleting ToDos Success" :props<{todoIndex:number}>(),
       "Deleting ToDos Failed" : props<{message:string}>()
    }
})





