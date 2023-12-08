import { apiSlice } from "./apiSlice";
import { clearCredentials, setCredentials } from "./authSlice";

const API_URL = "/api/users";

// Mutation means it is NOT going to make a GET request
// This is for the backend server stuff
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login User
    login: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/auth`,
        method: "POST",
        body: data,
      }),
      // Update the 'onSuccess' callback to dispatch the new action
      onSuccess: (response, variables, api, dispatch) => {
        dispatch(setCredentials(response)); // Set user information in Redux store and local storage
      },
    }),
    // Logout User
    logout: builder.mutation({
      query: () => ({
        url: `${API_URL}/logout`,
        method: "POST",
      }),
      // Update the 'onSuccess' callback to dispatch the new action
      onSuccess: (response, variables, api, dispatch) => {
        dispatch(clearCredentials()); // Clear user information from Redux store and local storage
      },
    }),
    // Register User
    register: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: "POST",
        body: data,
      }),
      // Update the 'onSuccess' callback to dispatch the new action
      onSuccess: (response, variables, api, dispatch) => {
        dispatch(setCredentials(response)); // Set user information in Redux store and local storage
      },
    }),
    // Update User Profile
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    // Save exercise to Login User Saved Favorite Exercises List
    saveExerciseToFaveList: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/favoriteexercisesdashboard`,
        method: "POST",
        body: data,
      }),
    }),
    // Delete saved exercise from Login User Saved Favorite Exercises List
    deleteSavedExerciseFromList: builder.mutation({
      query: (exerciseId) => ({
        url: `${API_URL}/favoriteexercisesdashboard`,
        method: "DELETE",
        body: exerciseId,
      }),
    }),
    // Fetch saved exercise list from Login User Saved Favorite Exercises List
    fetchSavedFaveExercisesList: builder.query({
      query: (data) => ({
        url: `${API_URL}/favoriteexercisesdashboard`,
        method: "GET",
        body: data,
      }),
    }),
    // Update saved exercise list from Login User Saved Favorite Exercises List
    updateSavedFaveExercisesList: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/favoriteexercisesdashboard`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

// Destructure the action creators
export const { 
  useLoginMutation, 
  useLogoutMutation, 
  useRegisterMutation, 
  useUpdateUserProfileMutation,
  useSaveExerciseToFaveListMutation,
  useDeleteSavedExerciseFromListMutation,
  useFetchSavedFaveExercisesListQuery,
  useUpdateSavedFaveExercisesListMutation,
} = usersApiSlice;