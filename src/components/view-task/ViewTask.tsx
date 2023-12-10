import { useAppDispatch, useAppSelector } from '../../store/store';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import iconEllipsis from '../../assets/icon-vertical-ellipsis.svg';

import Subtask from '../subtask/Subtask';
import Status from '../forms-components/status/Status';

import './styles.scss';
import { updateTaskService } from '../../services/board-service';
import { TasksEntity } from '../../types/board-schema';
import { setViewTask } from '../../store/features/slice-board';

export default function ViewTask() {
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

  async function processForm(data: any) {
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
      })
      .catch((error) => console.log(error))
      .finally();
  }

  const someChange: Boolean =
    JSON.stringify(viewTask) === JSON.stringify(getValues());

  return (
    <div className="view-task-container">
      <div className="view-task-header flex">
        <p className="heading-l">{title}</p>
        <button>
          <img src={iconEllipsis} alt="settings" />
        </button>
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
        />
      </form>
    </div>
  );
}
