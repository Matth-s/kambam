import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';

import boardLogo from '../../assets/icon-board.svg';
import CreateBoardButton from '../buttons/create-board-button/CreateBoardButton';

import './styles.scss';

type Props = {
  activeBoard: string;
};

export default function Aside({ activeBoard }: Props) {
  const { boards } = useAppSelector((state) => state.boardSlice);
  const navigate = useNavigate();

  const boardsName =
    boards.length > 0
      ? boards.map((item) => {
          return {
            name: item.name,
            id: item.id,
          };
        })
      : [];

  if (boards.length !== 0) {
  }

  async function handleViewBoard(id: string) {
    navigate(`/boards/${id}`);
  }

  return (
    <aside className="aside-container">
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
    </aside>
  );
}
