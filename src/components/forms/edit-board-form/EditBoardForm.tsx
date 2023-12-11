import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { boardValidation } from '../../../validation/forms';
import { BoardEntity } from '../../../types/board-schema';
import { updateBoardService } from '../../../services/board-service';
import { setOpenModal } from '../../../store/features/slice-modal';
import { toastMessage } from '../../../helpers/toastConfing';
import { useState } from 'react';

import Column from '../../forms-components/column/Column';

export default function EditBoardForm() {
  const { id } = useParams();
  const { boards } = useAppSelector((state) => state.boardSlice);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const findBoard = boards.find((board) => board.id === id);

  if (!findBoard) {
    return <></>;
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    values: findBoard,
    resolver: zodResolver(boardValidation),
  });

  async function processForm(data: BoardEntity) {
    setIsLoading(true);

    await dispatch(
      updateBoardService({ id: id as string, board: data })
    )
      .unwrap()
      .then(() => {
        dispatch(setOpenModal(''));
        toastMessage({
          message: 'Board updated successfully',
          success: true,
        });
      })
      .catch(() =>
        toastMessage({
          message: 'Board updated failed',
          success: false,
        })
      )
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="new-board-form-container">
      <p>Edit Board</p>

      <form onSubmit={handleSubmit(processForm)}>
        <div className="form-div">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register('name')}
            placeholder="e.g. Web Design"
          />
          {errors.name?.message && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>

        <Column
          columns={watch('columns')}
          setValue={setValue}
          register={register}
          errors={errors}
        />

        <input
          className={`radius-20  ${isLoading ? 'is-loading' : ''}`}
          type="submit"
          value="Save Changes"
        />
      </form>
    </div>
  );
}
