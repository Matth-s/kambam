import { UseFormRegister } from 'react-hook-form';
import { subtaskCompletedCount } from '../../helpers/subtaskCompleted';
import {
  SubtasksEntity,
  TasksEntity,
} from '../../types/board-schema';

import './styles.scss';

type Props = {
  subtasks: SubtasksEntity[] | [];
  register: UseFormRegister<TasksEntity>;
};

export default function Subtask({ subtasks, register }: Props) {
  return (
    <div className="subtask-container">
      <p className="body-m">
        Subtasks ({subtaskCompletedCount(subtasks)} of{' '}
        {subtasks.length})
      </p>

      {subtasks.length > 0 &&
        subtasks.map((subtask, index) => (
          <div key={subtask.id} className="flex flex__alignCenter">
            <input
              type="checkbox"
              id={subtask.id}
              {...register(`subtasks.${index}.isCompleted`)}
            />
            <label
              htmlFor={subtask.id}
              className={`${subtask.isCompleted ? 'completed' : ''}`}
            >
              {subtask.title}
            </label>
          </div>
        ))}
    </div>
  );
}
