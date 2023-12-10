import NewColumnButton from '../buttons/new-column-button/NewColumnButton';

import './styles.scss';

export default function EmptyBoard() {
  return (
    <div className="empty-board">
      <p>This board is empty. Create a new column to get started.</p>
      <NewColumnButton />
    </div>
  );
}
