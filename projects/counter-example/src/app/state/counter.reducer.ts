import { createReducer, on } from "@ngrx/store";
import { decrementCounterAction, incrementCounterAction, resetCounterAction } from "./counter.actions";

let initialState:number=0;

export const stateSliceKey:string="myCountState";


export const counterReducer=createReducer(
    initialState,
    on(incrementCounterAction,(state,props)=>{
        console.log(`Original value of state is ${state}`)
        console.log(`Reducer Acting on ${props.type}. Incrementing counter by ${props.incrementBy}`)
        const newState=state +props.incrementBy
        console.log(`New value of state is ${JSON.stringify(newState)}`);
        return newState;
    }),
    on(decrementCounterAction,(state,props)=>{
        console.log(`Original value of state is ${state}`)
        console.log(`Reducer Acting on ${props.type}`)  ;
        const newState=state -1
        console.log(`New value of state is ${newState}`);
       return  newState;
    }),
    on(resetCounterAction,(state,props)=>{
        console.log(`Original value of state is ${state}`)
        console.log(`Reducer Acting on ${props.type}`)  ;
        const newState=initialState
        console.log(`New value of state is ${newState}`);
       return  newState;    
    })
)