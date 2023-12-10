import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  BoardEntity,
  ColumnsEntity,
  TasksEntity,
} from '../types/board-schema';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConf';
import {
  setBoard,
  setDeleteBoard,
  setNewBoard,
  setUpdateBoard,
} from '../store/features/slice-board';

import { v4 as uuidv4 } from 'uuid';

//boards
export const getAllBoardService = createAsyncThunk(
  'getAllBoard',
  async (_, { dispatch }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'boards'));
      const data: BoardEntity[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as BoardEntity);
      });

      dispatch(setBoard(data));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const createBoardService = createAsyncThunk(
  'createBoard',
  async ({ board }: { board: BoardEntity }, { dispatch }) => {
    try {
      const newBoardId = uuidv4();

      const boardDocRef = doc(db, 'boards', newBoardId);

      await setDoc(boardDocRef, { ...board, id: newBoardId });

      dispatch(setNewBoard({ ...board, id: newBoardId }));

      return newBoardId;
    } catch (error) {
      throw error;
    }
  }
);

export const updateBoardService = createAsyncThunk(
  'update board',
  async (
    { id, board }: { id: string; board: BoardEntity },
    { dispatch }
  ) => {
    try {
      const boardRef = doc(db, 'boards', id);
      const boardSnap = await getDoc(boardRef);

      if (!boardSnap.exists()) {
        throw new Error("Board doesn't exist");
      }

      await updateDoc(boardRef, { ...board });

      dispatch(setUpdateBoard(board));
    } catch (error) {
      throw error;
    }
  }
);

export const deleteBoardService = createAsyncThunk(
  'delete board',
  async ({ id }: { id: string }, { dispatch }) => {
    try {
      const boardDocRef = doc(db, 'boards', id);
      await deleteDoc(boardDocRef);
      dispatch(setDeleteBoard(id));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

//columns

export const createColumnService = createAsyncThunk(
  'create column',
  async ({ board }: { board: BoardEntity }, { dispatch }) => {
    console.log('create column');
    try {
      const boardDocRef = doc(db, 'boards', board.id);

      await updateDoc(boardDocRef, {
        ...board,
      });

      dispatch(setUpdateBoard(board));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

//tasks

export const updateTaskService = createAsyncThunk(
  'update task',
  async (
    {
      id,
      newTask,
      oldTask,
    }: { id: string; newTask: TasksEntity; oldTask: TasksEntity },
    { dispatch }
  ) => {
    try {
      const boardRef = doc(db, 'boards', id);
      const boardSnap = await getDoc(boardRef);

      if (!boardSnap.exists()) {
        throw new Error("This board doesn't exist");
      }

      const boardData = boardSnap.data() as BoardEntity;

      // if task status are egal

      if (newTask.status === oldTask.status) {
        boardData.columns = boardData.columns.map((column) => {
          if (column.name === newTask.status) {
            column.tasks = column.tasks.map((task) => {
              if (task.id === newTask.id) {
                return newTask;
              }
              return task;
            });
          }
          return column;
        });

        await updateDoc(boardRef, { ...boardData });

        dispatch(setUpdateBoard(boardData));

        return newTask;
      } else {
        // delete task on old column
        boardData.columns = boardData.columns.map((column) => {
          if (column.name === oldTask.status) {
            column.tasks = column.tasks.filter(
              (task) => task.id !== newTask.id
            );
          }
          return column;
        });

        //add task to new Column

        boardData.columns = boardData.columns.map((column) => {
          if (column.name === newTask.status) {
            column.tasks = [...column.tasks, newTask];
          }
          return column;
        });

        await updateDoc(boardRef, { ...boardData });

        dispatch(setUpdateBoard(boardData));

        return newTask;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const createTaskService = createAsyncThunk(
  'create task',
  async (
    { id, newTask }: { id: string; newTask: TasksEntity },
    { dispatch }
  ) => {
    const taskWithId = { ...newTask, id: uuidv4() };
    const { status } = taskWithId;

    try {
      const boardRef = doc(db, 'boards', id);
      const boardSnap = await getDoc(boardRef);

      if (!boardSnap.exists()) {
        throw new Error("This board doesn't exist");
      }

      const boardData: BoardEntity = boardSnap.data() as BoardEntity;

      const columnsUpdate = boardData.columns.map((column) => {
        if (column.name === status) {
          return {
            ...column,
            tasks: [...column.tasks, taskWithId],
          };
        }
        return column;
      });

      const boardUpdate: BoardEntity = {
        ...boardData,
        columns: [...columnsUpdate],
      };

      await updateDoc(boardRef, { ...boardUpdate });

      dispatch(setUpdateBoard(boardUpdate));

      return taskWithId;
    } catch (error) {
      throw error;
    }
  }
);
