import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TaskValidation } from '../../../validation/forms';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { TasksEntity } from '../../../types/board-schema';
import { createTaskService } from '../../../services/board-service';
import { setOpenModal } from '../../../store/features/slice-modal';
import { setViewTask } from '../../../store/features/slice-board';

import Subtasks from '../../forms-components/subtasks/Subtasks';
import Status from '../../forms-components/status/Status';

import './styles.scss';
import { useState } from 'react';
import { toastMessage } from '../../../helpers/toastConfing';
export default function NewTaskForm() {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { boards } = useAppSelector((state) => state.boardSlice);

  const findBoard = boards.find((board) => board.id === id);

  if (!findBoard) {
    return <></>;
  }

  const statusChoice = findBoard.columns.map((item) => {
    return item.name;
  });

  const values: TasksEntity = {
    id: ``,
    title: '',
    description: '',
    status: statusChoice[0],
    subtasks: [],
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    values: values,
    resolver: zodResolver(TaskValidation),
  });

  async function processForm(data: any) {
    setIsLoading(false);

    await dispatch(
      createTaskService({ id: id as string, newTask: data })
    )
      .unwrap()
      .then((res: TasksEntity) => {
        dispatch(setViewTask(res));
        dispatch(setOpenModal('view-task'));
        toastMessage({ message: 'task created', success: true });
      })
      .catch(() =>
        toastMessage({
          message: 'task create failed',
          success: false,
        })
      )
      .finally(() => setIsLoading(false));
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
