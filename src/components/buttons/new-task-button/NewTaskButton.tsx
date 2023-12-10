import { setOpenModal } from '../../../store/features/slice-modal';
import { useAppDispatch } from '../../../store/store';

export default function NewTaskButton() {
  const dispatch = useAppDispatch();

  function handleOpenNewTask() {
    dispatch(setOpenModal('new-task-modal'));
  }

  return (
    <button
      onClick={() => handleOpenNewTask()}
      className="add-new-task-button button-rounded"
    >
      + Add New Task
    </button>
  );
}
