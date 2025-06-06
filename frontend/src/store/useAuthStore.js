// store for authentication
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

// calling create function that takes an callback function as first argument where we would like to return an object which would be our initial state.
// we would we using setter function as first parameter in the callback function
// we would be setting authUser to null initially
export const useAuthStore = create((set) => ({
  // initially authUser state will be null because we do not know whether the user is authenticated or not.
  authUser: null,
  // in authentication store, we will have a bunch of different loading state
  isSigningUp: false, // initially it is false because we are not signing up from start as a state
  isLoggingIn: false, // initially it is false because we are not logging from start as a state
  isUpdatingProfile: false, // it is also initially false, just think it as a variable holding the state of updating profile
  isLoggingOut: false, // initially it is false because we are not logging out from start as a state

  // we might want to have a loading state for this
  isCheckingAuth: true, // intitially it is true because as soon as the app loads or refreshes we would like to check whether the user is authenticated or not

  // we are right now interested in isChekingAuth, because when we refresh our page, for a sec, we would like to check whether the user is authenticated or not and show a loading spinner while it is checking.
  checkAuth: async () => {
    try {
      // under try we would like to send the request to the backend to check whether the user is authenticated or not
      // this will be done by sending a get request to /api/auth/check route which we created in auth.route.js in backend as get request as "/check" and protectRoute function
      // before, that we used app.use("/api/auth", authRoutes) which was declared in backend/src/routes/auth.route.js
      // AND, REMEMBER, we are using axiosInstance which is created in frontend/src/lib/axios.js instead of fetch
      // so, baseURL is "http://localhost:5001/api/" and we are sending a get request to "/auth/check" here.
      const res = await axiosInstance.get("/auth/check");

      // using setter function to set the response data as authUser's value
      // if the user is authenticated, we will get the user data in response
      set({ authUser: res.data });
    } catch (error) {
      // if the user is not authenticated, or error occurs, we will set authUser to null
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      // finally always runs, so we will set isCheckingAuth to false
      set({ isCheckingAuth: false });
    }
  },

  // just like, checkAuth, we will have a function called signup
  signup: async (data) => {
  },
}));
