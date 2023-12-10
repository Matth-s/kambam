import { setOpenModal } from '../../../store/features/slice-modal';
import { useAppDispatch } from '../../../store/store';

export default function NewColumnButton() {
  const dispatch = useAppDispatch();

  function handleOpenColumnForm() {
    dispatch(setOpenModal('create-column-modal'));
  }

  return (
    <button
      onClick={() => handleOpenColumnForm()}
      className="new-column  button-rounded"
    >
      + Add New Column
    </button>
  );
}
