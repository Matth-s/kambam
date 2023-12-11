import './styles.scss';

type Props = {
  whatToDelete: 'board' | 'task';
  name: string;
  closeModal: () => void;
  deleteAction: () => void;
};

export default function DeleteDialog({
  whatToDelete,
  name,
  closeModal,
  deleteAction,
}: Props) {
  return (
    <div className="delete-dialog-container">
      <h2 className="heading-l">Delete this {whatToDelete} ?</h2>

      <p>
        {whatToDelete === 'board'
          ? `Are you sure you want to delete the ‘${name}’ board? This action will remove all columns and tasks and cannot be reversed.`
          : `Are you sure you want to delete the ‘${name}’ task and its subtasks? This action cannot be reversed.`}
      </p>

      <div className="button-div flex">
        <button
          className="button-rounded"
          onClick={() => deleteAction()}
        >
          Delete
        </button>
        <button
          className="button-rounded"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
