import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { StoreModule } from '@ngrx/store';
import {todoStateKey, todosReducer } from './state/todos.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { ToDoEffects } from './state/todo.effects';

export const routes:Route[]=[
  {
    path:"",
    component:ToDoListComponent
  }
]

@NgModule({
  declarations: [
    ToDoListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(todoStateKey,todosReducer),
    EffectsModule.forFeature(ToDoEffects)
  ]
})
export class ToDoModule { }
