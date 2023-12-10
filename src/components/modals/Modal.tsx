import { useAppSelector } from '../../store/store';
import { createPortal } from 'react-dom';

import NewBoardForm from '../forms/new-board-form/NewBoardForm';
import CloseModalButton from '../buttons/close-modal-button/CloseModalButton';
import ViewTask from '../view-task/ViewTask';
import NewColumnForm from '../forms/new-column-form/NewColumnForm';

import './styles.scss';
import NewTaskForm from '../forms/new-task-form/NewTaskForm';
import EditBoardForm from '../forms/edit-board-form/EditBoardForm';

export default function Modal() {
  const { modal } = useAppSelector((state) => state.modalSlice);

  switch (modal) {
    case 'create-board-modal':
      return createPortal(
        <div className="modal-container">
          <CloseModalButton />
          <div className="modal-content">
            <NewBoardForm />
          </div>
        </div>,
        document.body
      );

    case 'view-task':
      return createPortal(
        <div className="modal-container">
          <CloseModalButton />
          <div className="modal-content">
            <ViewTask />
          </div>
        </div>,
        document.body
      );

    case 'create-column-modal':
      return createPortal(
        <div className="modal-container">
          <CloseModalButton />
          <div className="modal-content">
            <NewColumnForm />
          </div>
        </div>,
        document.body
      );

    case 'new-task-modal':
      return createPortal(
        <div className="modal-container">
          <CloseModalButton />
          <div className="modal-content">
            <NewTaskForm />
          </div>
        </div>,
        document.body
      );

    case 'edit-board-modal':
      return createPortal(
        <div className="modal-container">
          <CloseModalButton />
          <div className="modal-content">
            <EditBoardForm />
          </div>
        </div>,
        document.body
      );

    default:
      return null;
  }
}
