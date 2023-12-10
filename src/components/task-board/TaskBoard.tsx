import { subtaskCompletedCount } from '../../helpers/subtaskCompleted';
import { setViewTask } from '../../store/features/slice-board';
import { setOpenModal } from '../../store/features/slice-modal';
import { useAppDispatch } from '../../store/store';
import { TasksEntity } from '../../types/board-schema';

import './styles.scss';

type Props = { task: TasksEntity };

export default function TaskBoard({ task }: Props) {
  const { subtasks } = task;
  const dispatch = useAppDispatch();

  function handleViewTask() {
    dispatch(setViewTask(task));
    dispatch(setOpenModal('view-task'));
  }

  return (
    <div onClick={() => handleViewTask()} className="task-container">
      <p className="heading-m">{task.title}</p>

      <p className="body-m">
        {subtaskCompletedCount(subtasks)} of {subtasks.length}{' '}
        substasks
      </p>
    </div>
  );
}
