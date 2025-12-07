import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = {
  stepCount: 0,
  completedStep: [],
  data: {},
};

const stepperSlice = createSlice({
  name: "stepper",
  initialState: INITIAL_STATE,
  reducers: {
    handleNext: (state, action) => {
      const { stepCount } = state;
      if (stepCount < 3) {
        state.stepCount = stepCount + 1;
      }
    },
    handleBack: (state, action) => {
      const { stepCount } = state;
      if (stepCount > 1) {
        state.stepCount = stepCount - 1;
      }
    },
    handleEdit: (state, action) => {
        state.stepCount = action.payload
    },
  },
});

export const { handleNext, handleBack, handleEdit} = stepperSlice.actions;
export default stepperSlice.reducer;
