import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BoardEntity, TasksEntity } from '../../types/board-schema';

interface boardState {
  boards: BoardEntity[];
  isLoading: boolean;
  viewTask: TasksEntity | null;
}

const initialState: boardState = {
  isLoading: true,
  boards: [],
  viewTask: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<BoardEntity[] | []>) => {
      state.boards = action.payload;
      state.isLoading = false;
    },

    setNewBoard: (state, action: PayloadAction<BoardEntity>) => {
      state.boards.push(action.payload);
    },

    setDeleteBoard: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const filtredBoards = state.boards.filter(
        (board) => board.id !== id
      );

      state.boards = filtredBoards;
    },

    setUpdateBoard: (state, action: PayloadAction<BoardEntity>) => {
      const payloadBoard = action.payload;

      const boardFiltred = state.boards.filter(
        (board) => board.id !== payloadBoard.id
      );

      const boardUpdate = [...boardFiltred, payloadBoard];

      state.boards = boardUpdate;
    },

    setViewTask: (
      state,
      action: PayloadAction<TasksEntity | null>
    ) => {
      state.viewTask = action.payload;
    },
  },
});

export const {
  setBoard,
  setNewBoard,
  setDeleteBoard,
  setViewTask,
  setUpdateBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
