import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { deleteBoardService } from '../../services/board-service';
import { useNavigate } from 'react-router-dom';
import { setOpenModal } from '../../store/features/slice-modal';
import { toastMessage } from '../../helpers/toastConfing';

import logoLight from '../../assets/logo-dark.svg';
import iconEllipsis from '../../assets/icon-vertical-ellipsis.svg';
import DeleteDialog from '../delete-dialog/DeleteDialog';

import './styles.scss';

type Props = {
  boardName: string;
  idBoard: string;
  buttonActive: boolean;
};

export default function Header({
  boardName,
  idBoard,
  buttonActive,
}: Props) {
  const [openAction, setOpenAction] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleOpenEditBoard() {
    dispatch(setOpenModal('edit-board-modal'));
  }

  function handleOpenNewTask() {
    dispatch(setOpenModal('new-task-modal'));
  }

  async function handleDeleteBoard() {
    await dispatch(deleteBoardService({ id: idBoard }))
      .then(() => {
        toastMessage({
          message: 'Board as been deleted',
          success: true,
        });
        navigate('/boards');
      })
      .catch(() =>
        toastMessage({
          message: 'Board delete failed',
          success: false,
        })
      );
  }

  return (
    <>
      <header className="header-container">
        <div className="left-part flex">
          <img src={logoLight} alt="kambam" />
        </div>

        <div className="right-part">
          <h2 className="heading-xl">{boardName}</h2>
          <button
            onClick={() => handleOpenNewTask()}
            className={`add-new-task-button button-rounded ${
              buttonActive ? '' : 'is-disable'
            }`}
          >
            + Add New Task
          </button>
          <button onClick={() => setOpenAction((prev) => !prev)}>
            <img src={iconEllipsis} alt="settings" />
          </button>

          {openAction && (
            <div className="settings">
              <button onClick={() => handleOpenEditBoard()}>
                Edit board
              </button>
              <button onClick={() => setOpenDialog(true)}>
                Delete board
              </button>
            </div>
          )}
        </div>
      </header>

      {openDialog && (
        <DeleteDialog
          name={boardName}
          whatToDelete={'board'}
          closeModal={() => setOpenDialog(false)}
          deleteAction={() => handleDeleteBoard()}
        />
      )}
    </>
  );
}
