import {
  BoardEntity,
  ColumnsEntity,
} from '../../../types/board-schema';
import {
  UseFormSetValue,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import iconCross from '../../../assets/icon-cross.svg';

import './styles.scss';

type Props = {
  columns: ColumnsEntity[] | [];
  setValue: UseFormSetValue<BoardEntity>;
  register: UseFormRegister<BoardEntity>;
  errors: FieldErrors<BoardEntity>;
};

export default function Column({
  columns,
  setValue,
  register,
  errors,
}: Props) {
  function deleteItem(id: string) {
    const columnsFiltred = columns.filter((item) => item.id !== id);

    setValue('columns', columnsFiltred);
  }

  function addColumn() {
    const newColumn: ColumnsEntity = {
      id: uuidv4(),
      name: '',
      tasks: [],
    };
    setValue('columns', [...columns, newColumn]);
  }

  return (
    <div className="column-form">
      <p>Columns</p>
      {columns.length > 0 &&
        columns.map((item, index) => (
          <div key={item.id} className="form-div flex">
            <input
              type="text"
              {...register(`columns.${index}.name`)}
            />
            <button
              className="delete-button"
              type="button"
              onClick={() => deleteItem(item.id)}
            >
              <img src={iconCross} alt="delete" />
            </button>
            {errors &&
              errors.columns &&
              errors.columns[index]?.name?.message && (
                <p className="error-message">
                  {errors.columns[index]?.name?.message}
                </p>
              )}
          </div>
        ))}

      <button
        className="add-button"
        type="button"
        onClick={() => addColumn()}
      >
        + Add New Column
      </button>
    </div>
  );
}
