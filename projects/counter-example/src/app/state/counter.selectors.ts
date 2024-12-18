import { createFeatureSelector } from "@ngrx/store";
import { stateSliceKey } from "./counter.reducer";

export const counterSelector= createFeatureSelector<number>(stateSliceKey);