import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { useAside } from '../../hook/useAside';

import boardLogo from '../../assets/icon-board.svg';
import CreateBoardButton from '../buttons/create-board-button/CreateBoardButton';
import Theme from '../theme/Theme';
import OpenAsideButton from '../buttons/open-aside-button/OpenAsideButton';
import CloseAsideButton from '../buttons/close-aside-button/CloseAsideButton';

import './styles.scss';

type Props = {
  activeBoard: string;
};

const Aside = ({ activeBoard }: Props) => {
  const navigate = useNavigate();
  const { asideIsOpen, openAside, closeAside } = useAside();

  const { boards } = useAppSelector((state) => state.boardSlice);

  const boardsName =
    boards.length > 0
      ? boards.map((item) => {
          return {
            name: item.name,
            id: item.id,
          };
        })
      : [];

  const handleViewBoard = (id: string) => {
    navigate(`/boards/${id}`);
  };

  return (
    <>
      {asideIsOpen ? (
        <aside
          className={`aside-container  ${
            asideIsOpen ? 'open-sidebar' : 'close-sidebar'
          }`}
        >
          <div className="board-nav-div">
            <p className="heading-s">ALL BOARDS ({boards.length})</p>

            <ul>
              {boardsName.map((item) => (
                <li
                  onClick={() => handleViewBoard(item.id)}
                  className={`flex flex__alignCenter heading-m ${
                    item.id === activeBoard ? 'active-board' : ''
                  }`}
                  key={item.id}
                >
                  <img src={boardLogo} alt="board" />
                  <span>{item.name}</span>
                </li>
              ))}

              <CreateBoardButton />
            </ul>
          </div>

          <Theme />
          <CloseAsideButton closeAside={closeAside} />
        </aside>
      ) : (
        <OpenAsideButton openAside={openAside} />
      )}
    </>
  );
};

export default Aside;
