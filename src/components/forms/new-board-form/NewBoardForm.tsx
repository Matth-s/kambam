import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { boardValidation } from '../../../validation/forms';
import { BoardEntity } from '../../../types/board-schema';
import { useAppDispatch } from '../../../store/store';
import { createBoardService } from '../../../services/board-service';
import { setOpenModal } from '../../../store/features/slice-modal';
import { useNavigate } from 'react-router-dom';
import { toastMessage } from '../../../helpers/toastConfing';

import Column from '../../forms-components/column/Column';

import './styles.scss';
import { useState } from 'react';

export default function NewBoardForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formData: BoardEntity = {
    id: '',
    name: '',
    columns: [],
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    values: formData,
    resolver: zodResolver(boardValidation),
  });

  async function processForm(data: BoardEntity) {
    setIsLoading(true);
    await dispatch(createBoardService({ board: data }))
      .unwrap()
      .then((res: string /*return id*/) => {
        dispatch(setOpenModal(''));
        navigate(`/boards/${res}`);
        toastMessage({
          message: 'Board created successfully',
          success: true,
        });
      })
      .catch(() =>
        toastMessage({
          message: 'Board created failed',
          success: false,
        })
      )
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="new-board-form-container">
      <p className="heading-l">Add New Board</p>

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
          className={`radius-20  ${isLoading ? 'is-loading' : ''} `}
          type="submit"
          value="Create New Board"
        />
      </form>
    </div>
  );
}
