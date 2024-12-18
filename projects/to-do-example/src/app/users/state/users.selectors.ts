import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState, userStateKey } from "./users.reducers";

const userFeatureSelector=createFeatureSelector<UserState>(userStateKey); // get the desired state slice

export const usersListSelector=createSelector(
    userFeatureSelector,
    (state)=>state.users
)

export const currentUserSelector=createSelector(
    userFeatureSelector,
    (state)=>state?.selectedUser?.id || 0
)

export const userErrorSelector=createSelector(
    userFeatureSelector,
    (state)=>state.error
)
