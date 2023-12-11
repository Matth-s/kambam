import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBoardService } from '../../services/board-service';
import { useAppDispatch, useAppSelector } from '../../store/store';

import Aside from '../../components/aside/Aside';
import Header from '../../components/header/Header';
import Main from '../../components/main/Main';
import Modal from '../../components/modals/Modal';

export default function BoardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, boards } = useAppSelector(
    (state) => state.boardSlice
  );

  if (isLoading) {
    dispatch(getAllBoardService());
    return <>Chargement</>;
  }

  useEffect(() => {
    if (boards.length > 0) {
      navigate(`/boards/${boards[0].id}`);
    }
  }, [boards.length]);

  return (
    <div>
      <Header boardName="" idBoard="" buttonActive={false} />
      <Main>
        <Aside activeBoard="" />
      </Main>
      <Modal />
    </div>
  );
}
