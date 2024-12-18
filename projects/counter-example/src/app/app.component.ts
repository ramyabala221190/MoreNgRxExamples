import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {decrementCounterAction, incrementCounterAction, resetCounterAction } from './state/counter.actions';
import { counterSelector } from './state/counter.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  currentCount$?:Observable<number>;
  incrementBy:number=1;

  constructor(private store:Store<{[stateSliceKey:string]:number}>){
    // this.store.subscribe((result)=>{
    //   //just logged to see how the entire state look like
    //   console.log("Entire State:", JSON.stringify(result))
    // })
    this.currentCount$=this.store.select(counterSelector);
  }

  incrementCounter(){
    console.log("incrementing counter")
     const actionToBeDispatched=incrementCounterAction({incrementBy:this.incrementBy});
     console.log(actionToBeDispatched);
     this.store.dispatch(actionToBeDispatched);
  }

  decrementCounter(){
    console.log("decrementing counter")
    const actionToBeDispatched= decrementCounterAction();
    console.log(actionToBeDispatched);
   this.store.dispatch(actionToBeDispatched)
  }

  resetCounter(){
    console.log("resetting counter")
    const actionToBeDispatched=resetCounterAction();
    console.log(actionToBeDispatched);
   this.store.dispatch(actionToBeDispatched);
  }

}
