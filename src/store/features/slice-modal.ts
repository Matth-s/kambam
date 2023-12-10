import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

interface modalState {
  modal: string;
}

const initialState: modalState = {
  modal: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<string>) => {
      state.modal = action.payload;
    },
  },
});

export const { setOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
