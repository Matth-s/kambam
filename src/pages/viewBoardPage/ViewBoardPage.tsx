import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getAllBoardService } from '../../services/board-service';

import Main from '../../components/main/Main';
import Header from '../../components/header/Header';
import Aside from '../../components/aside/Aside';
import Modal from '../../components/modals/Modal';
import ContentBoard from '../../components/content-board/ContentBoard';

export default function ViewBoardPage() {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { isLoading, boards } = useAppSelector(
    (state) => state.boardSlice
  );

  if (isLoading) {
    dispatch(getAllBoardService());
    return <>Chargement</>;
  }

  const findBoard = boards.find((board) => board.id === id);

  if (!findBoard) {
    return (
      <>
        <p>This board doesn't exist</p>
      </>
    );
  }

  return (
    <div>
      <Header boardName={findBoard.name} idBoard={findBoard.id} />
      <Main>
        <Aside activeBoard={findBoard.id} />
        <ContentBoard columns={findBoard.columns} />
      </Main>
      <Modal />
    </div>
  );
}
