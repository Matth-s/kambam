import { ColumnsEntity } from '../../types/board-schema';
import NewColumnButton from '../buttons/new-column-button/NewColumnButton';

import ColumnBoard from '../column-board/ColumnBoard';
import EmptyBoard from '../empty-board/EmptyBoard';

import './styles.scss';

type Props = {
  columns: ColumnsEntity[] | [];
};

export default function ContentBoard({ columns }: Props) {
  return (
    <div className={`column-board-container flex`}>
      {columns.length > 0 ? (
        <>
          {columns.map((item) => (
            <ColumnBoard key={item.id} column={item} />
          ))}

          <NewColumnButton />
        </>
      ) : (
        <EmptyBoard />
      )}
    </div>
  );
}
