import { configureStore } from "@reduxjs/toolkit"
import counterSlice from "@/redux/slice/counter"
import authSlice from "@/redux/slice/auth-slice"
import stepperSlice from "@/redux/slice/stepper-slice"
import pageDataSlice from "@/redux/slice/page-data-slice"

export const store = configureStore({
  reducer: {
    counterSlice,
    authSlice,
    stepperSlice,
    pageDataSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
