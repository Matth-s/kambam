import { SubtasksEntity } from '../types/board-schema';

export const subtaskCompletedCount = (
  subtask: SubtasksEntity[] | []
) => {
  if (subtask.length === 0) {
    return 0;
  }

  const count = subtask.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue.isCompleted ? 1 : 0),
    0
  );

  return count;
};
