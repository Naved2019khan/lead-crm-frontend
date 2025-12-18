import { createSlice } from '@reduxjs/toolkit'

const pageDataSlice = createSlice({
  name: 'pageData',
  initialState: {
    data: {},
    isLoading : true,
    isError : false
  },
  reducers: {
    setPageData: (state, action)=> {
      state.isLoading = false
      state.data = action.payload
    },
    setDataLoading: (state,action) => {
        state.isLoading = action.payload
    },
    setDataError: (state,action) => {
        state.isError = action.payload
    }
  }
})

export const { setDataError, setDataLoading, setPageData } = pageDataSlice.actions
export default pageDataSlice.reducer

