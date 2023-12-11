import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  deleteTaskService,
  updateTaskService,
} from '../../services/board-service';
import { TasksEntity } from '../../types/board-schema';
import { setViewTask } from '../../store/features/slice-board';
import { toastMessage } from '../../helpers/toastConfing';

import iconEllipsis from '../../assets/icon-vertical-ellipsis.svg';

import Subtask from '../subtask/Subtask';
import Status from '../forms-components/status/Status';
import DeleteDialog from '../delete-dialog/DeleteDialog';

import './styles.scss';
import { setOpenModal } from '../../store/features/slice-modal';

export default function ViewTask() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { viewTask, boards } = useAppSelector(
    (state) => state.boardSlice
  );

  const findBoard = boards.find((board) => board.id === id);

  if (!viewTask || !findBoard) {
    return <></>;
  }

  const { title, description } = viewTask;

  const { register, setValue, watch, handleSubmit, getValues } =
    useForm({
      values: viewTask,
    });

  const statusChoice = findBoard.columns.map((column) => {
    return column.name;
  });

  async function deleteTask() {
    if (viewTask) {
      setIsLoading(true);
      dispatch(
        deleteTaskService({
          boardId: id as string,
          taskStatus: viewTask.status,
          taskId: viewTask.id,
        })
      )
        .unwrap()
        .then(() =>
          toastMessage({
            message: 'Task as been deleted',
            success: true,
          })
        )
        .catch(() =>
          toastMessage({
            message: 'Task delete failed',
            success: false,
          })
        )
        .finally(() => setIsLoading(false));
    }
  }

  async function editTask() {
    dispatch(setOpenModal('edit-task-modal'));
  }

  async function processForm(data: any) {
    setIsLoading(true);
    await dispatch(
      updateTaskService({
        id: id as string,
        newTask: data,
        oldTask: viewTask as TasksEntity,
      })
    )
      .unwrap()
      .then((res: TasksEntity) => {
        dispatch(setViewTask(res));
        toastMessage({
          message: 'Substak updated successfully',
          success: true,
        });
      })
      .catch(() =>
        toastMessage({
          message: 'Substack update failed',
          success: false,
        })
      )
      .finally(() => setIsLoading(false));
  }

  const someChange: Boolean =
    JSON.stringify(viewTask) === JSON.stringify(getValues());

  return (
    <div className="view-task-container">
      <div className="view-task-header flex">
        <p className="heading-l">{title}</p>

        <button onClick={() => setOpenSettings((prev) => !prev)}>
          <img src={iconEllipsis} alt="settings" />
        </button>

        {openSettings && (
          <div className="settings">
            <button onClick={() => editTask()}>Edit Task</button>
            <button onClick={() => setOpenDialog(true)}>
              Delete Task
            </button>
          </div>
        )}
      </div>

      <p className="body-l description">{description}</p>

      <form onSubmit={handleSubmit(processForm)}>
        <Subtask subtasks={watch('subtasks')} register={register} />

        <Status
          currentChoice={watch('status')}
          status="Current Status"
          setValue={setValue}
          statusChoice={statusChoice}
        />

        <input
          type="submit"
          value="Saves"
          disabled={someChange ? true : false}
          className={isLoading ? 'is-loading' : ''}
        />
      </form>

      {openDialog && (
        <DeleteDialog
          whatToDelete="task"
          name={viewTask.title}
          closeModal={() => setOpenDialog(false)}
          deleteAction={() => deleteTask()}
        />
      )}
    </div>
  );
}
