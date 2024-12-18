import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { UsersService } from '../../services/users.service';
import { UserModel } from '../userModel';
import { HttpErrorResponse } from '@angular/common/http';
import { UserApiActions } from './users.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersEffect {

  constructor(private actions$:Actions,private usersService:UsersService) { }

  ngrxOnInitEffects(){
    return UserApiActions.loadUsers(); ///dispatches action to populate the dropdown
  }

  loadUsersEffect$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(UserApiActions.loadUsers), //handles only UserApiActions.loadUsers
      mergeMap(()=>{
        return this.usersService.fetchUsers().pipe(
          map((result:UserModel[])=>{return UserApiActions.loadUsersSuccess({usersData:result})}),
          catchError((err:HttpErrorResponse) => { console.log(err); return of(UserApiActions.loadUsersFailed({ errorMessage: err.statusText }))})
          //of operator is required because catchError operator does not immediately return the response
        )
      })
    )
  })

}
