import { ColumnsEntity } from '../../types/board-schema';

import TaskBoard from '../task-board/TaskBoard';

import './styles.scss';

type Props = {
  column: ColumnsEntity;
};

export default function ColumnBoard({ column }: Props) {
  const { tasks } = column;

  return (
    <div className="column-container">
      <p className="heading-m">{column.name}</p>

      <div>
        {tasks.length > 0 &&
          tasks.map((item) => (
            <TaskBoard key={item.id} task={item} />
          ))}
      </div>
    </div>
  );
}
