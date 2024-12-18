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
            users:effectResult.usersData,
            selectedUser:state.selectedUser,
            error:""
        }
    }),
    on(UserApiActions.loadUsersFailed,(state,effectsResult)=>{
      return {
        ...state,
        users:[],
        error:effectsResult.errorMessage,
        selectedUser:null
      }
    }),
    on(UserPageActions.setSelectedUser,(state,props)=>{
        return {
            ...state,
            selectedUser:state.users.find(user=>user.id == props.userId) || null
        }
    })
)


