import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserModel } from "../userModel";


export const UserPageActions=createActionGroup({
    source:"User Page",
    events:{
     "Set Selected User": props<{userId:number}>()      
    }
})

export const UserApiActions=createActionGroup({
    source: "User API",
    events:{
        "Load Users":emptyProps(),
        "Load Users Success":props<{usersData:UserModel[]}>(),
        "Load Users Failed":props<{errorMessage:string}>()
    } 
})


