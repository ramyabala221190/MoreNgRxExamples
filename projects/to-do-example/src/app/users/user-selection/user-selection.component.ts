import { Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { UserModel } from '../userModel';
import { UserState } from '../state/users.reducers';
import { currentUserSelector, userErrorSelector, usersListSelector } from '../state/users.selectors';
import { UserPageActions } from '../state/users.actions';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent {

constructor(private store:Store<UserState>){}
selectedUserId:number = 0;
usersList$?:Observable<UserModel[]>;
errors$?:Observable<string>;

   ngOnInit(){
    this.usersList$=this.store.select(usersListSelector);
    this.store.select(currentUserSelector).pipe(
      tap((result:number)=>{this.selectedUserId=result})
    ).subscribe();
    this.errors$=this.store.select(userErrorSelector);
    //this.store.dispatch(loadUsers()); moved this to ngrxOnInitEffects() {}
   }

   selectUser(){
    this.store.dispatch(UserPageActions.setSelectedUser({userId:this.selectedUserId}))
   }

}
