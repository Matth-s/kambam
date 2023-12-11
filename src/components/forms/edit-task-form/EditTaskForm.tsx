import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TaskValidation } from '../../../validation/forms';
import { TasksEntity } from '../../../types/board-schema';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useParams } from 'react-router-dom';

import Status from '../../forms-components/status/Status';
import Subtasks from '../../forms-components/subtasks/Subtasks';
import { updateTaskService } from '../../../services/board-service';
import { toastMessage } from '../../../helpers/toastConfing';

export default function EditTaskForm() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { viewTask, boards } = useAppSelector(
    (state) => state.boardSlice
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!viewTask) {
    return <></>;
  }
  const findBoard = boards.find((board) => board.id === id);

  if (!findBoard) {
    return <></>;
  }

  const statusChoice = findBoard.columns.map((item) => {
    return item.name;
  });

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: viewTask,
    resolver: zodResolver(TaskValidation),
  });

  async function processForm(data: TasksEntity) {
    setIsLoading(true);

    await dispatch(
      updateTaskService({
        id: id as string,
        newTask: data,
        oldTask: viewTask as TasksEntity,
      })
    )
      .unwrap()
      .then(() => {
        toastMessage({
          message: 'Task updated successfully',
          success: true,
        });
      })
      .catch(() =>
        toastMessage({
          message: 'Tast update failed',
          success: false,
        })
      );
  }

  return (
    <div className="new-task-form-container">
      <p>Add New Task</p>
      <form onSubmit={handleSubmit(processForm)}>
        <div className="form-div">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" {...register('title')} />
          {errors.title?.message && (
            <p className="error-message">{errors.title.message}</p>
          )}
        </div>

        <div className="form-div">
          <label htmlFor="description">Description</label>
          <textarea id="description" {...register('description')} />
          {errors.description?.message && (
            <p className="error-message">
              {errors.description.message}
            </p>
          )}
        </div>

        <Subtasks
          setValue={setValue}
          subtasks={watch('subtasks')}
          register={register}
          errors={errors}
        />

        <Status
          status="Status"
          statusChoice={statusChoice}
          setValue={setValue}
          currentChoice={watch('status')}
        />
        <input
          type="submit"
          value="Create Task"
          className={`button-rounded  ${
            isLoading ? 'is-loading' : ''
          } `}
        />
      </form>
    </div>
  );
}
