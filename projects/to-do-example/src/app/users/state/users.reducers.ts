import { createReducer, on } from "@ngrx/store";
import { UserModel } from "../userModel";
import { UserApiActions, UserPageActions } from "./users.actions";

export interface UserState{
   users:UserModel[],
   selectedUser: UserModel| null,
   error:string
}

export const userStateKey:string="userState";

const initialUserState: UserState={
    users:[],
    selectedUser:null,
    error:""

}

export const userReducer=createReducer(
    initialUserState,
    on(UserApiActions.loadUsersSuccess,(state,effectResult)=>{
        return {
            ...state,
            users:effectResult.usersData, //populates the dropdown with the 10 user's names
            selectedUser:state.selectedUser, // sets any previously selected user or its null
            error:"" //clears any error messages
        }
    }),
    on(UserApiActions.loadUsersFailed,(state,effectsResult)=>{
      return {
        ...state,
        users:[], //loading failed. The dropdown will be empty
        error:effectsResult.errorMessage, // show error message
        selectedUser:null //no selected user
      }
    }),
    on(UserPageActions.setSelectedUser,(state,props)=>{
        return {
            ...state,
            selectedUser:state.users.find(user=>user.id == props.userId) || null // update the selected user
        }
    })
)


