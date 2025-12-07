import { configureStore } from "@reduxjs/toolkit"
import counterSlice from "@/redux/slice/counter"
import authSlice from "@/redux/slice/auth-slice"
import stepperSlice from "@/redux/slice/stepper-slice"

export const store = () => {
  return configureStore({
    reducer: {
        counterSlice,
        authSlice,
        stepperSlice
    }
  })
}

export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()))

// // Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(incremented())
// // {value: 1}
// store.dispatch(incremented())
// // {value: 2}
// store.dispatch(decremented())
// // {value: 1}