import { createAction, props } from "@ngrx/store";

export const incrementCounterAction=createAction('[AppComponent]Increment',props<{incrementBy:number}>());
export const decrementCounterAction=createAction('[AppComponent]Decrement');
export const resetCounterAction=createAction('[AppComponent]Reset');