import { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { deleteBoardService } from '../../services/board-service';
import { useNavigate } from 'react-router-dom';

import logoLight from '../../assets/logo-dark.svg';
import iconEllipsis from '../../assets/icon-vertical-ellipsis.svg';

import NewTaskButton from '../buttons/new-task-button/NewTaskButton';

import './styles.scss';
import { setOpenModal } from '../../store/features/slice-modal';

type Props = {
  boardName: string;
  idBoard: string;
};

export default function Header({ boardName, idBoard }: Props) {
  const [openAction, setOpenAction] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleOpenEditBoard() {
    dispatch(setOpenModal('edit-board-modal'));
  }

  async function handleDeleteBoard() {
    await dispatch(deleteBoardService({ id: idBoard }))
      .then(() => navigate('/boards'))
      .catch((error) => console.log(error));
  }

  return (
    <header className="header-container">
      <div className="left-part flex">
        <img src={logoLight} alt="kambam" />
      </div>

      <div className="right-part">
        <h2 className="heading-xl">{boardName}</h2>
        <NewTaskButton />
        <button onClick={() => setOpenAction((prev) => !prev)}>
          <img src={iconEllipsis} alt="settings" />
        </button>

        {openAction && (
          <div className="settings">
            <button onClick={() => handleOpenEditBoard()}>
              Edit board
            </button>
            <button onClick={() => handleDeleteBoard()}>
              Delete board
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
