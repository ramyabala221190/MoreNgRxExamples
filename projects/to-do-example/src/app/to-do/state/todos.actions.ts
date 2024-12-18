import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { ToDoModel } from "../todoModel";


export const ToDoTabActions=createActionGroup({
    source:"ToDo Tab",
    events:{
        "Update ToDo":props<{updatedToDo:ToDoModel,todoIndex:number}>(),
        "Delete ToDo":props<{todoIndex:number}>(),
        "Create ToDo": props<{newToDo:ToDoModel}>()
    }
})

export const ToDoApiActions=createActionGroup({
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





