import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserModel } from "../userModel";


export const UserPageActions=createActionGroup({
    source:"User Page",
    events:{
     "Set Selected User": props<{userId:number}>()  //action is dispatched when user is selected in dropdown    
    }
})

export const UserApiActions=createActionGroup({
    //All the below actions are dispatched by Effects
    source: "User API",
    events:{
        "Load Users":emptyProps(),
        "Load Users Success":props<{usersData:UserModel[]}>(),
        "Load Users Failed":props<{errorMessage:string}>()
    } 
})


