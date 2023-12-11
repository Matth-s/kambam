import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface modalState {
  modal: string | null;
}

const initialState: modalState = {
  modal: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<string | null>) => {
      state.modal = action.payload;
    },
  },
});

export const { setOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
