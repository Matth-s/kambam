import Aside from '../../components/aside/Aside';
import Header from '../../components/header/Header';
import Main from '../../components/main/Main';
import Modal from '../../components/modals/Modal';
import { getAllBoardService } from '../../services/board-service';
import { useAppDispatch, useAppSelector } from '../../store/store';

export default function BoardPage() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.boardSlice);

  if (isLoading) {
    dispatch(getAllBoardService());
    return <>Chargement</>;
  }

  return (
    <div>
      <Header boardName="" idBoard="" />
      <Main>
        <Aside activeBoard="" />
      </Main>
      <Modal />
    </div>
  );
}
