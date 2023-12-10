import {
  SubtasksEntity,
  TasksEntity,
} from '../../../types/board-schema';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import iconCross from '../../../assets/icon-cross.svg';

import './styles.scss';

type Props = {
  subtasks: SubtasksEntity[] | [];
  setValue: UseFormSetValue<TasksEntity>;
  register: UseFormRegister<TasksEntity>;
  errors: FieldErrors<TasksEntity>;
};

export default function Subtasks({
  subtasks,
  setValue,
  register,
  errors,
}: Props) {
  function addSubtask() {
    setValue('subtasks', [
      ...subtasks,
      {
        id: uuidv4(),
        title: '',
        isCompleted: false,
      },
    ]);
  }

  function deleteSubtask(id: string) {
    console.log('hey');
    const filtredSubtasks = subtasks.filter(
      (subtask) => subtask.id !== id
    );

    setValue('subtasks', filtredSubtasks);
  }

  return (
    <div className="subtask-form">
      <p className="heading-s">Subtasks</p>
      {subtasks.length > 0 &&
        subtasks.map((item, index) => (
          <div key={item.id} className="flex form-div">
            <input
              type="text"
              id="title"
              {...register(`subtasks.${index}.title`)}
            />
            <button
              type="button"
              onClick={() => deleteSubtask(item.id)}
            >
              <img src={iconCross} alt="delete" />
            </button>
            {errors &&
              errors.subtasks &&
              errors.subtasks[index]?.title?.message && (
                <p className="error-message">
                  {errors.subtasks[index]?.title?.message}
                </p>
              )}
          </div>
        ))}

      <button
        type="button"
        onClick={() => addSubtask()}
        className="button-rounded add-subtask"
      >
        + Add New Subtask
      </button>
    </div>
  );
}
