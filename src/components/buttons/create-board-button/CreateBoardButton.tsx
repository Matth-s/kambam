import { setOpenModal } from '../../../store/features/slice-modal';
import { useAppDispatch } from '../../../store/store';

import iconBoard from '../../../assets/icon-board.svg';

export default function CreateBoardButton() {
  const dispatch = useAppDispatch();

  function handleOpenCreateBoard() {
    dispatch(setOpenModal('create-board-modal'));
  }

  return (
    <>
      <button onClick={() => handleOpenCreateBoard()}>
        <img src={iconBoard} alt="board" /> + Create New Board
      </button>
    </>
  );
}
