import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import alertReducer from './slices/AlertSlice'
// ...

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
