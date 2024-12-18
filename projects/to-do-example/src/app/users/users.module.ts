import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { Route, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { userReducer, userStateKey } from './state/users.reducers';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersEffect } from './state/users.effect';

export const routes:Route[]=[
  {
    path:"",
    component:UserSelectionComponent
  }
]

@NgModule({
  declarations: [
    UserSelectionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(userStateKey,userReducer),
    EffectsModule.forFeature(UsersEffect)
  ]
})
export class UsersModule { }
