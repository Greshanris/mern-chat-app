// store for authentication
import {create} from "zustand";

// calling create function that takes an callback function as first argument where we would like to return an object which would be our initial state.
// we would we using setter function as first parameter in the callback function
// we would be setting authUser to null initially
export const useAuthStore = create((set) => ({
    // initially authUser state will be null because we do not know whether the user is authenticated or not.
    authUser: null,
    // we might want to have a loading state for this
    isCheckingAuth: true, // intitially it is true because as soon as the app loads or refreshes we would like to check whether the user is authenticated or not
}))