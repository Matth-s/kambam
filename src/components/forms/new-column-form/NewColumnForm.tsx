import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { boardValidation } from '../../../validation/forms';
import { BoardEntity } from '../../../types/board-schema';
import { toastMessage } from '../../../helpers/toastConfing';

import Column from '../../forms-components/column/Column';
import { createColumnService } from '../../../services/board-service';
import { setOpenModal } from '../../../store/features/slice-modal';

export default function NewColumnForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { boards } = useAppSelector((state) => state.boardSlice);

  const findBoard = boards.find((item) => item.id === id);

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

  useEffect(() => {
    if (watch('columns').length === 0) {
      setValue('columns', [
        {
          id: uuidv4(),
          name: '',
          tasks: [],
        },
      ]);
    }
  }, []);

  async function processForm(data: BoardEntity) {
    setIsLoading(true);

    await dispatch(createColumnService({ board: data }))
      .unwrap()
      .then(() => {
        dispatch(setOpenModal(''));
        toastMessage({
          message: 'Column created successfully',
          success: true,
        });
      })
      .catch(() =>
        toastMessage({
          message: 'Column created failed',
          success: false,
        })
      )
      .finally(() => setIsLoading(false));
  }

  return (
    <div>
      <p>Add New Column</p>
      <form onSubmit={handleSubmit(processForm)}>
        <Column
          columns={watch('columns')}
          setValue={setValue}
          register={register}
          errors={errors}
        />
        <input
          type="submit"
          value="Create Column"
          className={isLoading ? 'is-loading' : ''}
        />
      </form>
    </div>
  );
}
